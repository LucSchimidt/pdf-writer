"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pdfkit_1 = __importDefault(require("pdfkit"));
const fs_1 = __importDefault(require("fs"));
class generateReport {
    constructor(filePath, id, title, responsable) {
        this.doc = new pdfkit_1.default();
        const writeStream = fs_1.default.createWriteStream(filePath);
        this.doc.pipe(writeStream);
        const imageWidth = 250;
        const pageWidth = this.doc.page.width;
        const xPosition = (pageWidth - imageWidth) / 2;
        this.doc.image('./assets/logo.png', xPosition, 0, { fit: [250, 250], align: 'center' });
        this.doc.moveDown();
        this.doc.moveDown();
        this.doc.moveDown();
        this.doc.moveDown();
        this.doc.moveDown();
        this.doc.moveDown();
        this.doc.fillColor('#4B5563');
        this.doc.fontSize(32).text('Relatório de captura técnica de conteúdo digital');
        this.doc.moveDown();
        this.doc.fillColor('black');
        this.doc.font('Helvetica-Bold');
        this.doc.fontSize(12).text('Identificador:');
        this.doc.fillColor('#4B5563');
        this.doc.font('Helvetica');
        this.doc.fontSize(16).text(`${id}`);
        this.doc.moveDown();
        this.doc.fillColor('black');
        this.doc.font('Helvetica-Bold');
        this.doc.fontSize(12).text('Título:');
        this.doc.fillColor('#4B5563');
        this.doc.font('Helvetica');
        this.doc.fontSize(16).text(`${title}`);
        this.doc.moveDown();
        this.doc.fillColor('black');
        this.doc.font('Helvetica-Bold');
        this.doc.fontSize(12).text('Responsável:');
        this.doc.fillColor('#4B5563');
        this.doc.font('Helvetica');
        this.doc.fontSize(16).text(`${responsable}`);
        this.doc.moveDown();
        const smallImageWidth = 125;
        const smallXPosition = (pageWidth - smallImageWidth) / 2;
        const imageHeight = 125;
        const pageHeight = this.doc.page.height;
        const yPosition = pageHeight - imageHeight - this.doc.page.margins.bottom + 50;
        this.doc.image('./assets/logo.png', smallXPosition, yPosition, { fit: [125, 125], align: 'center', valign: 'bottom' });
    }
    introductionPage() {
        const content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt arcu at ligula ullamcorper, eget egestas dui ullamcorper. Integer vulputate sapien at bibendum vehicula. Nulla facilisi. Mauris egestas, ipsum ac interdum iaculis, neque lorem vulputate arcu, ac consequat elit justo sit amet purus. Curabitur vehicula auctor ligula, eu viverra odio posuere ac. Curabitur id lorem in libero placerat scelerisque non sit amet neque. Morbi interdum dui eu mauris aliquam, at aliquet justo sodales. Quisque faucibus tempor turpis, sit amet egestas orci vestibulum ac. Vivamus fermentum libero et sem condimentum, sed rhoncus velit vestibulum. Integer feugiat sollicitudin ligula, et tincidunt ligula placerat et. Donec eget est nec sapien euismod convallis id sed augue. Nullam varius purus eget dui gravida, non rutrum purus facilisis. Vivamus ut ligula hendrerit, aliquam dui non, auctor orci. Sed consectetur justo quis bibendum convallis. Aenean eget erat venenatis, euismod purus vitae, tincidunt orci. Ut feugiat, orci nec tincidunt feugiat, nulla dolor convallis velit, sed vehicula est enim a ligula. Aenean auctor ipsum sapien, eu euismod felis auctor nec. Sed fermentum, magna vitae fermentum pretium, enim felis laoreet enim, sit amet mollis purus felis ac purus. Quisque pretium, lectus a laoreet finibus, urna lorem efficitur nulla, euismod dictum purus sapien sed est. Sed tempor massa nisi, at convallis elit sodales at. Aliquam a felis vitae dolor dapibus tempus. Donec fermentum bibendum massa, ac malesuada lacus viverra ut. Etiam cursus orci in nulla rutrum, ac fringilla risus tincidunt. Nunc tincidunt orci sed arcu tincidunt facilisis. In eget lectus felis. Nam in nunc dolor. Ut suscipit, lorem eu euismod volutpat, mi erat tincidunt sem, eget placerat magna augue eu erat. Fusce aliquet, sem non lobortis efficitur, ante dui elementum tortor, ac luctus purus felis sit amet arcu. Donec et dui sed odio maximus gravida et a sapien. Vestibulum ac magna arcu. Aliquam erat volutpat. Nullam dignissim, nisi vel facilisis gravida, dui nulla efficitur nulla, sed sollicitudin nulla ante et dui. Donec tristique libero sed sapien lobortis, et iaculis neque finibus. Aliquam erat volutpat. Cras feugiat viverra risus, ac tincidunt sapien aliquet eu. Mauris vel nisi vitae eros iaculis lacinia. Mauris rutrum urna risus, id tempus eros efficitur ut. Phasellus congue vestibulum ante et consectetur. Fusce efficitur auctor eros id pharetra. Ut vehicula suscipit mauris ac tempor. Aliquam erat volutpat. Nam dapibus cursus urna, eu vestibulum orci tempor sed.";
        this.doc.addPage();
        this.doc.font('Helvetica-Bold');
        this.doc.fontSize(16).text('Introdução:');
        this.doc.fillColor('#4B5563');
        this.doc.font('Helvetica');
        this.doc.fontSize(12).text(`${content}`);
        const imageWidth = 125;
        const pageWidth = this.doc.page.width;
        const xPosition = (pageWidth - imageWidth) / 2;
        const imageHeight = 125;
        const pageHeight = this.doc.page.height;
        const yPosition = pageHeight - imageHeight - this.doc.page.margins.bottom + 50;
        this.doc.image('./assets/logo.png', xPosition, yPosition, { fit: [125, 125], align: 'center', valign: 'bottom' });
    }
    certificationPage(qrcode_path, code) {
        this.doc.addPage();
        this.doc.font('Helvetica-Bold');
        this.doc.fontSize(16).text('Validador Online:');
        this.doc.fillColor('#4B5563');
        this.doc.font('Helvetica');
        this.doc.fontSize(12).text('');
        const imageWidth = 125;
        const pageWidth = this.doc.page.width;
        const xPosition = (pageWidth - imageWidth) / 2;
        const imageHeight = 125;
        const pageHeight = this.doc.page.height;
        const yPosition = pageHeight - imageHeight - this.doc.page.margins.bottom + 50;
        this.doc.image('./assets/logo.png', xPosition, yPosition, { fit: [125, 125], align: 'center', valign: 'bottom' });
    }
    generate() {
        this.doc.end();
        console.log('PDF gerado com sucesso!');
    }
}
const meu_relatorio = new generateReport('./relatorio.pdf', '090503', 'Relatório de organização dos periféricos', 'Lucas L. Schimidt');
meu_relatorio.introductionPage();
meu_relatorio.certificationPage('https://afinz.com.br/wp-content/uploads/2022/04/QR_Code_Afinz.png', '193j1e98u12eh1982u3912dh1');
meu_relatorio.generate();
