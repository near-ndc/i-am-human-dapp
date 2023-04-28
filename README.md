# I Am Human Dapp

Frontend for I Am Human and Soulbound Tokens.

## Contributing

Master is our `CI` branch for production (production dapp must use latest version of this branch), and `develop` is our ongoing development branch. Workflow:

1. Start a discussion in `NDC Technical WG` telegram (_IAH UI_ sub-channel) or create an issue.
2. Create a feature branch based on the latest `develop`.
3. Make a Pull Request targeting `develop`. Ask for reviews.
4. Once you will get approvals, use the Merge Queue - Github automatic mechanism to merge and squash your branch into `develop`.

To update the production:

1. Make a Pull Request from `develop` to `master`.
   - `master` must be ONLY updated by merging develop → master.
2. Use the Merge Queue - this time, it is configured to preserve commits (not squashing them).
3. CI will automatically build new prod version.
