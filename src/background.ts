import { Header } from "./Header";

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(["customHeaders"], ({ customHeaders }) => {
    updateRules(customHeaders ?? []);
  });
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === "local" && changes.customHeaders) {
    updateRules(changes.customHeaders.newValue ?? []);
  }
});

const maxRules = 1000;
const allIds = Array.from({ length: maxRules }, (_, i) => i + 1);

const updateRules = async (headers: Header[]) => {
  console.log("updating rules", headers);

  const validHeaders = headers.filter(({ key }) => key !== "");

  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: allIds,
    addRules: validHeaders.map(
      ({ key, value }, index): chrome.declarativeNetRequest.Rule => ({
        id: index + 1,
        priority: 1,
        action: {
          type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
          requestHeaders: [
            {
              header: key,
              operation: chrome.declarativeNetRequest.HeaderOperation.SET,
              value: value,
            },
          ],
        },
        condition: {
          urlFilter: "*",
          resourceTypes: [
            // TODO: and more
            chrome.declarativeNetRequest.ResourceType.XMLHTTPREQUEST,
            chrome.declarativeNetRequest.ResourceType.MAIN_FRAME,
          ],
        },
      })
    ),
  });

  chrome.declarativeNetRequest.getDynamicRules((rules) => {
    console.log("updated rules", rules);
  });
};
