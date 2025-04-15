import React, { FC, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Header } from "./Header";

const Popup: FC = () => {
  const [headers, setHeaders] = useState<Header[]>([]);

  console.log("headers", headers);

  useEffect(() => {
    chrome.storage.local.get(["customHeaders"], (data) => {
      console.log("read", data.customHeaders);
      setHeaders(data.customHeaders ?? []);
    });
  }, []);

  useEffect(() => {
    console.log("write", headers);
    chrome.storage.local.set({ customHeaders: headers });
  }, [headers]);

  const add = () => {
    setHeaders([...headers, { id: crypto.randomUUID(), key: "", value: "" }]);
  };

  const changeKey = (index: number, value: string) => {
    const copy = [...headers];
    copy[index].key = value.trim();
    setHeaders(copy);
  };

  const changeValue = (index: number, value: string) => {
    const copy = [...headers];
    copy[index].value = value.trim();
    setHeaders(copy);
  };

  const ddelete = (index: number) => {
    setHeaders(headers.filter((_, i) => i !== index));
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {headers.map((header, index) => (
            <tr key={header.id}>
              <td>
                <input
                  defaultValue={header.key}
                  onChange={(e) => changeKey(index, e.target.value)}
                />
              </td>
              <td>
                <input
                  defaultValue={header.value}
                  onChange={(e) => changeValue(index, e.target.value)}
                />
              </td>
              <td>
                <button onClick={() => ddelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={add}>Add header</button>
    </>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(<Popup />);
