# replace-project-meta - Replaces project meta from package.json/README.md

**CLI Usage:**

Hit `replace-project-meta` at npm project root. It will dig defaults from your `package.json`. After you've provided replacements, it will go through your `LICENSE`, `README.md` and `package.json` and replaces the matches. It's a little rough but it works.

**Library usage:**

```javascript
var replaceProjectMeta = require('replace-project-meta');

// originals = original values (i.e., from package.json)
// replacements = replacing values
// replacementPaths = files to operate against
replaceProjectMeta(originals, replacements, replacementPaths);
```

## License

replace-project-meta is available under MIT. See LICENSE for more details.
