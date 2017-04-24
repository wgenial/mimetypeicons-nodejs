var request = require('request');
var fs = require("fs");
var http = require("http");
var mime = require('mime');
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
    var defaultMime, icon, iconUrl, iconname, mimetype, size, icon_extension;
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
      iconname = mimetype.replace("/", "-");
      if (indexOf(icons_manifest_json.Names, iconname) == -1) {
        mimetype = mime.default_type;
      }
      iconname = mimetype.replace("/", "-");
    }

    if (indexOf(icons_manifest_json.Info.Sizes, size) == -1) {
      size = icons_size_default;
    }

    if (size == "scalable") {
      icon_extension = ".svg";
    } else {
      icon_extension = ".png";
    }

    iconUrl = "" + icons_path +"/"+ size + "/" + iconname + icon_extension;
    return res.redirect(301, iconUrl);
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
