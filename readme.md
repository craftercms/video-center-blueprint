# Video Center Blueprint

Live, live-to-VOD, and video serving blueprint on Crafter CMS.

## Building

*__TBD__: Add docs on how to build the ui app.*

## Site Configuration

### React Dev Server

1. Configure the `previewServer` property in the site configuration file, this can be done
   from Studio or changing directly `/config/studio/site-config.xml`:
   ```
   <previewServer>http://localhost:3000</previewServer>
   ```

2. Configure the dev server to proxy API calls to Engine, in `package.json` add the following configuration:
  ```
  "proxy": {
    "/api": {
      "target": "http://localhost:8080"
    },
    "/static-assets": {
      "target": "http://localhost:8080"
    }
  }
  ```

Using this configuration Crafter Studio preview will show the react dev server and it will support
hot reload when the js sources are changed.

To use the dev server directly without Studio you will need to set a cookie with the site name:

```
crafterSite={siteName}
```


*__TBD__: Add docs on how to configure Box & AWS profiles.*
