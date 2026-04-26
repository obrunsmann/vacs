cask "vacs" do
  arch arm: "aarch64", intel: "x64"

  version "2.2.0"
  sha256 arm: "089eab0f3e87b4cf76372ec8f28244d4fcaba3e59475e1371a5e7c09c09faed7",
         intel: "9a68707f1cc98b390c672754d40313798205fac8e07c5f3fac515893f6d9b830"

  url "https://github.com/vacs-project/vacs/releases/download/vacs-client-v#{version}/vacs_#{version}_#{arch}.dmg",
      verified: "github.com/vacs-project/vacs/"
  name "vacs"
  desc "Ground-to-ground voice communication system for VATSIM controllers"
  homepage "https://vacs.network"

  livecheck do
    url :url
    regex(/^vacs-client-v?(\d+(?:\.\d+)+)$/i)
    strategy :github_latest
  end

  app "vacs.app"

  auto_updates true

  caveats do
    <<~EOS
      vacs is currently not notarized. On first launch, macOS may block the app.
      If needed, remove quarantine attributes manually:

        sudo xattr -rd com.apple.quarantine /Applications/vacs.app
    EOS
  end
end
