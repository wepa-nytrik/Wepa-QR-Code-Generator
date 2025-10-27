const qr = new QRious({
  element: document.getElementById('qrCanvas'),
  size: 256,
  value: ''
});

const qrText = document.getElementById('qrText');
const qrColor = document.getElementById('qrColor');
const bgColor = document.getElementById('bgColor');
const qrSize = document.getElementById('qrSize');
const sizeValue = document.getElementById('sizeValue');
const logoInput = document.getElementById('logoInput');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');

qrSize.addEventListener('input', () => {
  sizeValue.textContent = `${qrSize.value} px`;
});

generateBtn.addEventListener('click', () => {
  const value = qrText.value.trim();
  if (!value) {
    alert('Please enter text or a URL!');
    return;
  }

  const size = parseInt(qrSize.value);
  qr.set({
    value: value,
    size: size,
    foreground: qrColor.value,
    background: bgColor.value
  });

  const canvas = document.getElementById('qrCanvas');
  const ctx = canvas.getContext('2d');

  const file = logoInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const logo = new Image();
      logo.onload = function() {
        const logoSize = size * 0.25;
        const x = (size - logoSize) / 2;
        const y = (size - logoSize) / 2;
        ctx.drawImage(logo, x, y, logoSize, logoSize);
      };
      logo.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  downloadBtn.href = qr.toDataURL();
});
