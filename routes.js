var request = require('request');
var fs = require("fs");
var http = require("http");
var mime = require('mime-types');
var indexOf = require('lodash.indexof');

var site = "https://github.com/wgenial/mimetypeicons";
var icons_path = "/mimetypes-icons";
var icons_manifest = 'FileTypeIcons.json';
var icons_directory_names = ["directory", "dir", "folder", "text/directory", "application/folder"];
var icons_manifest_json = null;
var icons_size_default = "32";

module.exports = {
  home: function(req, res, next) {
    return res.redirect(site);
  },
  icon: function(req, res, next) {
    
    var defaultMime, icon, iconUrl, iconname, mimetype, size, icon_extension, 
        status_code = 301, icon_found = true, size_found = true;
    
    icon = req.params.icon;

    size = req.query.size;
    if (size == null) {
      size = icons_size_default;
    }
    
    defaultMime = req.query["default"];
    if (defaultMime == null) {
      defaultMime = ".bin";
    }
    mime.default_type = mime.lookup(defaultMime);
    
    if (indexOf(icons_directory_names, icon) >= 0) {
      iconname = "text-directory";
    } else {
      
      mimetype = mime.lookup(icon);

      if (mimetype == false || indexOf(icons_manifest_json.Names, mimetype.replace("/", "-")) == -1) {
        mimetype = mime.default_type;
        iconname = mimetype.replace("/", "-");
        icon_found = false;
      }else {
        iconname = mimetype.replace("/", "-");
      }
    }

    // verify is size received exists in default sizes (.json)
    if (indexOf(icons_manifest_json.Info.Sizes, size) == -1) {
      size = icons_size_default;
      size_found = false;
    }

    // icon extension
    if (size == "scalable") {
      icon_extension = ".svg";
    } else {
      icon_extension = ".png";
    }

    if (!icon_found) {
      status_code = 302;
    } else if (icon_found && !size_found) {
      status_code = 302;
    }

    // uri to redirect
    iconUrl = "" + icons_path +"/"+ size + "/" + iconname + icon_extension;
    return res.redirect(status_code, iconUrl);

  },
  initialize: function() {
    fs.readFile(icons_manifest, 'utf8', function (err, data) {
      if (err) {
        console.log('Error: ' + err);
        return;
      }
      icons_manifest_json = JSON.parse(data);
    });
  }
};
