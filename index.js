let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const saveTab = document.getElementById("saveTab-btn");

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  renderLeads(myLeads);
}
function renderLeads(data) {
  let listItems = "";
  for (let i = 0; i < data.length; i++) {
    listItems += `
            <li>
                <a target='_blank' href='${data[i]}'>
                    ${data[i]}
                </a>
            </li>
        `;
  }
  ulEl.innerHTML = listItems;
}

saveTab.addEventListener("click", function () {
    debugger
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        renderLeads(myLeads)
    })
 
});

inputBtn.addEventListener("click", function (e) {
  e.preventDefault();
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  renderLeads(myLeads);
});

deleteBtn.addEventListener("click", function (e) {
  e.preventDefault();
  localStorage.clear();
  myLeads = [];
  renderLeads(myLeads);
});
