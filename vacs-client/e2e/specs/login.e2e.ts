import {authenticate, resetMockState} from "../helpers/auth.ts";
import {click, getClient} from "../helpers/browser.ts";

describe("Login Flow", () => {
    beforeEach(async () => {
        await resetMockState();
        await multiRemoteBrowser.reloadSession();
    });

    it("should show login page on startup", async () => {
        const client = getClient();
        const loginButton = await client.$("button=Login via VATSIM");
        await loginButton.waitForDisplayed({timeout: 1000});
    });

    it("should authenticate via mock OAuth and show connect page", async () => {
        const client = getClient();
        const loginButton = await client.$("button=Login via VATSIM");
        await loginButton.waitForDisplayed({timeout: 1000});

        await authenticate(client, "10000001");

        const connectButton = await client.$("button=Connect");
        await connectButton.waitForDisplayed({timeout: 1000});
    });

    it("should fail to authenticate via mock OAuth with invalid credentials", async () => {
        const client = getClient();
        const loginButton = await client.$("button=Login via VATSIM");
        await loginButton.waitForDisplayed({timeout: 1000});

        try {
            await authenticate(client, "99999999");
            throw new Error("Authentication should have failed but succeeded");
        } catch {}

        const connectButton = await client.$("button=Connect");
        await connectButton.waitForDisplayed({timeout: 1000, reverse: true});
    });

    it("should connect to signaling server after authentication", async () => {
        const client = getClient();
        const loginButton = await client.$("button=Login via VATSIM");
        await loginButton.waitForDisplayed({timeout: 1000});

        await authenticate(client, "10000001");

        const connectButton = await client.$("button=Connect");
        await connectButton.waitForDisplayed({timeout: 1000});

        await click(client, connectButton);

        await connectButton.waitForDisplayed({timeout: 1000, reverse: true});
    });

    it("should fail to connect with same credentials twice", async () => {
        const clientA = getClient("clientA");
        const clientB = getClient("clientB");

        await authenticate(clientA, "10000001");
        await authenticate(clientB, "10000001");

        const connectButtonA = await clientA.$("button=Connect");
        await connectButtonA.waitForDisplayed({timeout: 1000});
        const connectButtonB = await clientB.$("button=Connect");
        await connectButtonB.waitForDisplayed({timeout: 1000});

        await click(clientA, connectButtonA);

        await connectButtonA.waitForDisplayed({timeout: 1000, reverse: true});

        await click(clientB, connectButtonB);

        const alreadyConnectedOverlayA = await clientA.$("p=Already connected");
        await alreadyConnectedOverlayA.waitForDisplayed({timeout: 1000, reverse: true});
        const alreadyConnectedOverlayB = await clientB.$("p=Already connected");
        await alreadyConnectedOverlayB.waitForDisplayed({timeout: 1000});
    });
});
