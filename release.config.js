const packagePath = "./";

export default {
  branches: [
    "main",
    { name: "next", prerelease: true }, // Optional: for pre-releases from a 'next' branch
    { name: "beta", prerelease: true }, // Optional: for beta pre-releases
    { name: "alpha", prerelease: true }, // Optional: for alpha pre-releases
  ],
  plugins: [
    "@semantic-release/commit-analyzer", // Analyzes commit messages
    "@semantic-release/release-notes-generator", // Generates release notes
    [
      "@semantic-release/changelog", // Updates the changelog file
      {
        changelogFile: `${packagePath}/CHANGELOG.md`,
      },
    ],
    [
      "@semantic-release/npm", // Handles npm publishing and package.json version update
      {
        pkgRoot: packagePath, // Crucial: specifies the directory of the package
        npmPublish: true, // Set to false if you don't want to publish to npm
      },
    ],
    [
      "@semantic-release/git", // Commits changes (package.json, CHANGELOG.md) and creates a git tag
      {
        assets: [`${packagePath}/package.json`, `${packagePath}/CHANGELOG.md`],
        message: `chore(release): \${nextRelease.version} [skip ci]\n\n\${nextRelease.notes}`,
      },
    ],
    [
      "@semantic-release/github", // Creates a GitHub release
      {
        // Optional: Add assets to the GitHub release
        // assets: [
        //   { path: `${packagePath}/dist/**`, label: 'Distribution Files' },
        // ]
      },
    ],
  ],
};
