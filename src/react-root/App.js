import React, { useState } from 'react';
import Papa from 'papaparse';
import Button from '@material-ui/core/Button';
import { saveAs } from 'file-saver';
import CsvLoader from './CsvLoader';

export default ({ route, ...rest }) => {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);

  const [resultMsg, setResultMsg] = useState('');

  const onClick = () => {
    let resultMsg = '';

    const result1 = Papa.parse(file1.data);
    const result2 = Papa.parse(file2.data);
    resultMsg = `${resultMsg}檔案一有效行數：${result1.data.length}\n`;
    resultMsg = `${resultMsg}檔案二有效行數：${result2.data.length}\n`;

    const resultMap = {};
    result2.data.forEach((r) => {
      resultMap[r[0]] = true;
    });
    const matched = result1.data.filter(row => !resultMap[row[0]]).map(s => `${s[0]},`);
    resultMsg = `${resultMsg}符合行數：${matched.length}\n`;

    const blob = new Blob([matched.join('\n')], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'result.csv');
    setResultMsg(resultMsg);
  };

  return (
    <div style={{ margin: 64 }}>
      <CsvLoader
        id="f1"
        accept=".csv"
        label="選擇檔案一"
        value={file1}
        onChange={setFile1}
      />
      <br />
      <br />
      <CsvLoader
        id="f2"
        accept=".csv"
        label="選擇檔案二"
        value={file2}
        onChange={setFile2}
      />
      <br />
      <br />
      <Button
        variant="contained"
        color="primary"
        disabled={!file1 || !file2}
        onClick={onClick}
      >
        開始比對
      </Button>
      <br />
      <br />
      <br />
      結果：
      <pre>
        {resultMsg}
      </pre>
    </div>
  );
};
