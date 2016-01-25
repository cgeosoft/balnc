module.exports = function(Configuration) {

  // function createPdfBinary(pdfDoc, callback) {
  //
  //   var fontDescriptors = {
  //     Roboto: {
  //       normal: 'examples/fonts/Roboto-Regular.ttf',
  //       bold: 'examples/fonts/Roboto-Medium.ttf',
  //       italics: 'examples/fonts/Roboto-Italic.ttf',
  //       bolditalics: 'examples/fonts/Roboto-Italic.ttf'
  //     }
  //   };
  //
  //   var printer = new pdfMakePrinter(fontDescriptors);
  //
  //   var doc = printer.createPdfKitDocument(pdfDoc);
  //
  //   var chunks = [];
  //   var result;
  //
  //   doc.on('data', function(chunk) {
  //     chunks.push(chunk);
  //   });
  //   doc.on('end', function() {
  //     result = Buffer.concat(chunks);
  //     callback('data:application/pdf;base64,' + result.toString('base64'));
  //   });
  //   doc.end();
  //
  // }
  //
  // app.post('/pdf', function(req, res) {
  //
  //   createPdfBinary(req.body, function(binary) {
  //     res.contentType('application/pdf');
  //     res.send(binary);
  //   }, function(error) {
  //     res.send('ERROR:' + error);
  //   });
  //
  // });
  //
  //
  // Invoice.generate = function(id, force, cb) {
  //   Invoice.findById(id, function(err, invoice) {
  //     if (err) cb(err);
  //
  //     if (invoice == null) {
  //       cb("Not Found");
  //       return;
  //     }
  //
  //     var PdfPrinter = require('pdfmake/src/printer');
  //     var printer = new PdfPrinter({
  //       Roboto: {
  //         normal: './node_modules/open-sans-fontface/fonts/Regular/OpenSans-Regular.ttf',
  //         bold: './node_modules/open-sans-fontface/fonts/Bold/OpenSans-Bold.ttf',
  //         italics: './node_modules/open-sans-fontface/fonts/Italic/OpenSans-Italic.ttf',
  //         bolditalics: './node_modules/open-sans-fontface/fonts/BoldItalic/OpenSans-BoldItalic.ttf'
  //       }
  //     });
  //     var fs = require('fs');
  //     var storage = "storage" + "/" + invoice.companyId;
  //     var docDefinition = require('../pdftemplates/invoice.json');
  //
  //     if (invoice.file && !force) {
  //       var filepath = storage + invoice.file;
  //       cb(null, filepath);
  //       return;
  //     }
  //
  //     var filename = invoice.id + '.pdf';
  //     var filepath = storage + "/" + filename;
  //
  //     if (!fs.existsSync(storage)) {
  //       fs.mkdirSync(storage);
  //     }
  //
  //     var pdfDoc = printer.createPdfKitDocument(docDefinition);
  //     pdfDoc.pipe(fs.createWriteStream(filepath));
  //     pdfDoc.end();
  //
  //     invoice.file = filename;
  //
  //     invoice.save(function(err) {
  //       cb(null, filepath);
  //       return;
  //     });
  //
  //   });
  // }
  //
  // Invoice.remoteMethod(
  //   'invoice_preview', {
  //     description: "Generate the pdf file for this invoice.",
  //     http: {
  //       verb: 'get',
  //       path: '/invoice/preview'
  //     },
  //     accepts: [],
  //     returns: {
  //       arg: 'file',
  //       type: 'string'
  //     }
  //   }
  // );


};
