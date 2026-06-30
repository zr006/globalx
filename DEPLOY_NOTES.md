This workflow publishes the contents of the Globalx/ folder to the gh-pages branch when code is pushed to the fix/site-bugs branch.

Notes:
- The workflow uses the repository's GITHUB_TOKEN to push the gh-pages branch.
- After the gh-pages branch is created, GitHub Pages typically serves the site at https://zr006.github.io/globalx/ . If the site does not appear automatically, open the repository Settings > Pages and set the Source to the gh-pages branch.
- If Actions are restricted in your organization, an admin may need to allow the workflow to run and to allow creation/updating of gh-pages.
