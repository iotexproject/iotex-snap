import QRCode from 'qrcode';

export const generateQrCode = async (text: string, id: string) => {
  const canvas = document.getElementById(id);
  QRCode.toCanvas(canvas, text, function (error: any) {
    if (error) {
      console.error(error);
    }
    console.log('success!');
  });
};
