var helpers = require('./helpers.js'),
    async = require('async'),
    fs = require('fs'),
	mhelper=require('./material_helper');
	
exports.version = "0.1.0";

exports.list_all = function (req, res) {
    load_material_list(function (err, materials) {
        if (err) {
            helpers.send_failure(res, 500, err);
            return;
        }
        helpers.send_success(res, { materials: materials });
    });
};
exports.material_by_name = function (req, res) {
    // get the GET params
    var getp = req.query;
    var page_num = getp.page ? getp.page : 0;
    var page_size = getp.page_size ? getp.page_size : 1000;

    if (isNaN(parseInt(page_num))) page_num = 0;
    if (isNaN(parseInt(page_size))) page_size = 1000;

    // format of request is /materials/material_name.json
    var material_name = req.params.material_name;
    load_material(
        material_name,
        page_num,
        page_size,
        function (err, material_contents) {
            if (err && err.error == "no_such_material") {
                helpers.send_failure(res, 404, err);
            }  else if (err) {
                helpers.send_failure(res, 500, err);
            } else {
				helpers.send_success(res, { material_contents_data: material_contents });
            }
        }
    );
};

function load_material(material_name, page, page_size, callback){
	mhelper.getSubjectList(material_name, page, page_size, callback);

}