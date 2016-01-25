module.exports = function(Invoice) {

  Invoice.generate = function(id, force, cb) {
    Invoice.findById(id, function(err, invoice) {
      if (err) cb(err);

      if (invoice == null) {
        cb("Not Found");
        return;
      }

      var PdfPrinter = require('pdfmake/src/printer');
      var printer = new PdfPrinter({
        Roboto: {
          normal: './node_modules/open-sans-fontface/fonts/Regular/OpenSans-Regular.ttf',
          bold: './node_modules/open-sans-fontface/fonts/Bold/OpenSans-Bold.ttf',
          italics: './node_modules/open-sans-fontface/fonts/Italic/OpenSans-Italic.ttf',
          bolditalics: './node_modules/open-sans-fontface/fonts/BoldItalic/OpenSans-BoldItalic.ttf'
        }
      });
      var fs = require('fs');
      var storage = "storage" + "/" + invoice.companyId;
      var docDefinition = require('../pdftemplates/invoice.json');

      if (invoice.file && !force) {
        var filepath = storage + invoice.file;
        cb(null, filepath);
        return;
      }

      var filename = invoice.id + '.pdf';
      var filepath = storage + "/" + filename;

      if (!fs.existsSync(storage)) {
        fs.mkdirSync(storage);
      }

      var pdfDoc = printer.createPdfKitDocument(docDefinition);
      pdfDoc.pipe(fs.createWriteStream(filepath));
      pdfDoc.end();

      invoice.file = filename;

      invoice.save(function(err) {
        cb(null, filepath);
        return;
      });

    });
  }

  Invoice.remoteMethod(
    'generate', {
      description:"Generate the pdf file for this invoice.",
      http: {
        verb: 'get',
        path: '/:id/generate'
      },
      accepts: [{
        arg: 'id',
        type: 'any',
        description: 'Model id',
        required: true,
        http: {
          source: 'path'
        }
      }, {
        arg: 'force',
        type: 'boolean'
      }],
      returns: {
        root: true,
        type: 'string'
      }
    }
  );

};
