// http://code.hootsuite.com/html5/
export function isUploadSupported() {
  if (navigator.userAgent.match(/(Android (1.0|1.1|1.5|1.6|2.0|2.1))|(Windows Phone (OS 7|8.0))|(XBLWP)|(ZuneWP)|(w(eb)?OSBrowser)|(webOS)|(Kindle\/(1.0|2.0|2.5|3.0))/)) { // eslint-disable-line max-len
    return false;
  }
  return true;
}

export function isFileReaderSupported() {
  return window.File && window.FileReader && window.FormData;
}

export function processFile(dataURL, fileType) {
  return new Promise((resolve, reject) => {
    const result = {
      fileType,
      dataURL,
    };
    return resolve(result);
  });
}

export const readFile = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onloadend = () => {
    // console.log('reader.result, file :', reader.result, file);
    processFile(reader.result, file.type).then(resolve, reject);
  };

  reader.onerror = () => {
    reject(new Error('There was an error reading the file!'));
  };

  reader.readAsDataURL(file);
});
