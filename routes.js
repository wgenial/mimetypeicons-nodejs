const fs = require('fs');
const mime = require('mime-types');
const indexOf = require('lodash.indexof');

const site = 'https://github.com/wgenial/mimetypeicons';
const icons_path = '/mimetypes-icons';
const icons_manifest = 'FileTypeIcons.json';
const icons_directory_names = ['directory', 'dir', 'folder', 'text/directory', 'application/folder'];
const icons_size_default = '32';

let icons_manifest_json = null;

module.exports = {
  // default, redirect to project page
  home: (req, res) => {
    return res.redirect(site);
  },

  // load icon and redirect
  icon: (req, res) => {

    let defaultMime, 
        icon, 
        iconUrl, 
        iconname, 
        mimetype, 
        size, 
        icon_extension, 
        status_code = 301, 
        icon_found = true, 
        size_found = true;
    
    // get icon
    icon = req.params.icon;
    
    // set icon size
    size = req.query.size != null ? req.query.size : icons_size_default;

    // set default mime type
    defaultMime = req.query['default'] != null ? req.query['default'] : '.bin';
    mime.default_type = mime.lookup(defaultMime);

    // set icon name
    if (indexOf(icons_directory_names, icon) >= 0) {
      iconname = 'text-directory';
    } else {
      mimetype = mime.lookup(icon);
      if (mimetype == false || indexOf(icons_manifest_json.Names, mimetype.replace('/', '-')) == -1) {
        mimetype = mime.default_type;
        iconname = mimetype.replace('/', '-');
        icon_found = false;
      } else {
        iconname = mimetype.replace('/', '-');
      }
    }

    // verify is size received exists in default sizes (.json)
    if (indexOf(icons_manifest_json.Info.Sizes, size) == -1) {
      size = icons_size_default;
      size_found = false;
    }

    // icon extension
    if (size == 'scalable') {
      icon_extension = '.svg';
    } else {
      icon_extension = '.png';
    }

    // if icon not found, set status code 302
    if (!icon_found) {
      status_code = 302;
    } else if (icon_found && !size_found) {
      status_code = 302;
    }

    // uri to redirect
    iconUrl = '' + icons_path +'/'+ size + '/' + iconname + icon_extension;
    return res.redirect(status_code, iconUrl);

  },

  // load json manifest
  init: () => {
    fs.readFile(icons_manifest, 'utf8', (err, data) => {
      if (err) {
        console.log('Error: ' + err);
        return;
      }
      icons_manifest_json = JSON.parse(data);
    });
  }
};
