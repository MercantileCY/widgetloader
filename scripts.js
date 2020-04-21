// var submitClick = document.getElementById("submitApi");
if ($.cookie("olapicApiKey")) {
  var apiKey = document.getElementById("apiKeyInput");
  apiKey.value = $.cookie("olapicApiKey");
}
//function that wipe the current form to avoid duplicates
function wipeForm() {
  selectExists = document.getElementById("select");
  selectExists.parentNode.removeChild(selectExists);
  submitExists = document.getElementById("submitInstance");
  submitExists.parentNode.removeChild(submitExists);
  checkboxExists = document.getElementById("langCheckbox");
  checkboxExists.parentNode.removeChild(checkboxExists);
  labelExists = document.getElementById("checkboxLabel");
  labelExists.parentNode.removeChild(labelExists);
}
//function that wipes the data tag input
function wipeDataTag() {
  if (document.getElementById("dataTagInput")) {
    dataTagExists = document.getElementById("dataTagInput");
    dataTagExists.parentNode.removeChild(dataTagExists);
  } else {
  }
}
//fuction to wipe data-tag for category input
function wipeDataTagCat() {
  if (document.getElementById("dataTagCatInput")) {
    dataTagCatExists = document.getElementById("dataTagCatInput");
    dataTagCatExists.parentNode.removeChild(dataTagCatExists);
  } else {
  }
}
//function to wipe data-lang input ONLY
function wipeDataLang() {
  if (document.getElementById("dataLangInput")) {
    dataLangExists = document.getElementById("dataLangInput");
    dataLangExists.parentNode.removeChild(dataLangExists);
  } else {
  }
}
//function to wipe JUST the submit button so that PDP box comes before the submit
function wipeSubmitOnly() {
  if (document.getElementById("submitInstance")) {
    submitExists = document.getElementById("submitInstance");
    submitExists.parentNode.removeChild(submitExists);
  } else {
  }
}
//function to check if the current selection is a PDP
function pdpCheck() {
  var widgetList = document.getElementById("select");
  var pdpVal = widgetList.options[widgetList.selectedIndex].value;
  //checks the value of the selection and matches it against "by_tag" using regEx (the .match function is a regEx tool). This would translate to something like: where pdpVal LIKE '%by_tag%'
  if (pdpVal.match(/by_tag_category.*/)) {
    wipeDataTagCat();
    wipeDataTag();
    wipeSubmitOnly();
    createDataTagCat();
    createSubmitButton();
  } else if (pdpVal.match(/by_tag.*/)) {
    wipeDataTag();
    wipeDataTagCat();
    wipeSubmitOnly();
    createDataTag();
    createSubmitButton();
  } else {
    wipeDataTag();
    wipeDataTagCat();
    createSubmitButton();
  }
}
//function to create data-tag input when pdpCheck is true
function createDataTag() {
  var dataTag = document.createElement("input");
  var formEl = document.getElementById("form");
  dataTag.id = "dataTagInput";
  dataTag.type = "text";
  dataTag.name = "datatag";
  dataTag.placeholder = "Paste product ID here";
  formEl.appendChild(dataTag);
}
function createDataTagCat() {
  var dataTagCat = document.createElement("input");
  var formEl = document.getElementById("form");
  dataTagCat.id = "dataTagCatInput";
  dataTagCat.type = "text";
  dataTagCat.name = "datatagcat";
  dataTagCat.placeholder = "Paste Category Key here";
  formEl.appendChild(dataTagCat);
}
//function to create submit button
function createSubmitButton() {
  var submitInstance = document.createElement("input");
  var formEl = document.getElementById("form");
  submitInstance.id = "submitInstance";
  submitInstance.type = "button";
  submitInstance.value = "Preview Widget";
  submitInstance.classList.add("submitInstance");
  formEl.appendChild(submitInstance);
}
//function to create checkbox
function createCheckbox() {
  var langCheckbox = document.createElement("input");
  var labeText = document.createTextNode("Include Language");
  var checkboxLabel = document.createElement("label");
  var formEl = document.getElementById("languageForm");
  langCheckbox.id = "langCheckbox";
  langCheckbox.type = "checkbox";
  checkboxLabel.for = "langCheckbox";
  checkboxLabel.id = "checkboxLabel";
  formEl.appendChild(langCheckbox);
  formEl.appendChild(checkboxLabel);
  checkboxLabel.appendChild(labeText);
}
//function to create data-lang input if checkbox is ticked
function createDataLang() {
  var dataLang = document.createElement("input");
  var formEl = document.getElementById("languageForm");
  dataLang.id = "dataLangInput";
  dataLang.type = "text";
  dataLang.name = "datalang";
  dataLang.placeholder = "en_US";
  dataLang.maxLength = "5";
  formEl.appendChild(dataLang);
}
//function to check what type of URL is being opened at time of click
function URLcheck() {
  if (document.getElementById("dataTagInput")) {
    openURLpdp();
  } else if (document.getElementById("dataTagCatInput")) {
    openURLcat();
  } else {
    openURL();
  }
}
//function to open widget vanilla
function openURL() {
  var submitFinalClick = document.getElementById("submitInstance");
  submitFinalClick.addEventListener("click", function (e) {
    var apiKey = document.getElementById("apiKeyInput").value;
    if (document.getElementById("dataLangInput")) {
      var dataLang = document.getElementById("dataLangInput").value;
    } else {
      var dataLang = "en_US";
    }
    var currentSession = document.getElementById("select");
    var selectedInstance =
      currentSession.options[currentSession.selectedIndex].value;
    //the string replace is using RegEx to find and remove anything after the "-" in the instance value. This is because I was including the widget type for other purposes.
    //RegEx: \s - finds whitespace. \-(.*) - finds anything after the "-", including the "-".
    var fixedInstance = selectedInstance.replace(/\s\-(.*)/, "");
    var currentURL = document.URL;
    if (currentURL.match(/s3.amazonaws.*/)) {
      window.open(
        "http://s3.amazonaws.com/sowapps/themes-previewer/iframesrc.html?olapicForceRender&data-apiKey=" +
          apiKey +
          "&data-instance=" +
          fixedInstance +
          "&olapicLang=" +
          dataLang
      );
    } else {
      window.open(
        "http://s3.amazonaws.com/sowapps/themes-previewer/iframesrc.html?olapicForceRender&data-apiKey=" +
          apiKey +
          "&data-instance=" +
          fixedInstance +
          "&olapicLang=" +
          dataLang
      );
    }
  });
}

//function to open widget - PDP data tag included
function openURLpdp() {
  var submitFinalClick = document.getElementById("submitInstance");
  submitFinalClick.addEventListener("click", function (e) {
    var apiKey = document.getElementById("apiKeyInput").value;
    var dataTag = document.getElementById("dataTagInput").value;
    if (document.getElementById("dataLangInput")) {
      var dataLang = document.getElementById("dataLangInput").value;
    } else {
      var dataLang = "en_US";
    }
    var currentSession = document.getElementById("select");
    var selectedInstance =
      currentSession.options[currentSession.selectedIndex].value;
    //the string replace is using RegEx to find and remove anything after the "-" in the instance value. This is because I was including the widget type for other purposes.
    //RegEx: \s - finds whitespace. \-(.*) - finds anything after the "-", including the "-".
    var fixedInstance = selectedInstance.replace(/\s\-(.*)/, "");
    var currentURL = document.URL;
    if (dataTag === "") {
      document.getElementById("dataTagInput").placeholder =
        "Product ID is required";
      document.getElementById("dataTagInput").style.color = "red";
      document.getElementById("dataTagInput").style.border = "2px solid";
    } else {
      if (currentURL.match(/s3.amazonaws.*/)) {
        window.open(
          "http://s3.amazonaws.com/sowapps/themes-previewer/iframesrc.html?olapicForceRender&data-apiKey=" +
            apiKey +
            "&data-instance=" +
            fixedInstance +
            "&data-tags=" +
            dataTag +
            "&olapicLang=" +
            dataLang
        );
      } else {
        window.open(
          "http://s3.amazonaws.com/sowapps/themes-previewer/iframesrc.html?olapicForceRender&data-apiKey=" +
            apiKey +
            "&data-instance=" +
            fixedInstance +
            "&data-tags=" +
            dataTag +
            "&olapicLang=" +
            dataLang
        );
      }
    }
  });
}

//function to open widget - Cat tag included
function openURLcat() {
  var submitFinalClick = document.getElementById("submitInstance");
  submitFinalClick.addEventListener("click", function (e) {
    var apiKey = document.getElementById("apiKeyInput").value;
    var dataTagCat = document.getElementById("dataTagCatInput").value;
    if (document.getElementById("dataLangInput")) {
      var dataLang = document.getElementById("dataLangInput").value;
    } else {
      var dataLang = "en_US";
    }
    var currentSession = document.getElementById("select");
    var selectedInstance =
      currentSession.options[currentSession.selectedIndex].value;
    //the string replace is using RegEx to find and remove anything after the "-" in the instance value. This is because I was including the widget type for other purposes.
    //RegEx: \s - finds whitespace. \-(.*) - finds anything after the "-", including the "-".
    var fixedInstance = selectedInstance.replace(/\s\-(.*)/, "");
    var currentURL = document.URL;
    if (dataTagCat === "") {
      document.getElementById("dataTagCatInput").placeholder =
        "Catgeory Key is required";
      document.getElementById("dataTagCatInput").style.color = "red";
      document.getElementById("dataTagCatInput").style.border = "2px solid";
    } else {
      if (currentURL.match(/s3.amazonaws.*/)) {
        window.open(
          "http://s3.amazonaws.com/sowapps/themes-previewer/iframesrc.html?olapicForceRender&data-apiKey=" +
            apiKey +
            "&data-instance=" +
            fixedInstance +
            "&data-tags=" +
            dataTagCat +
            "&olapicLang=" +
            dataLang
        );
      } else {
        window.open(
          "http://s3.amazonaws.com/sowapps/themes-previewer/iframesrc.html?olapicForceRender&data-apiKey=" +
            apiKey +
            "&data-instance=" +
            fixedInstance +
            "&data-tags=" +
            dataTagCat +
            "&olapicLang=" +
            dataLang
        );
      }
    }
  });
}

window.addEventListener("load", function load(event) {
  var submitClick = document.getElementById("submitApi");
  submitClick.addEventListener("click", function (e) {
    var apiKey = document.getElementById("apiKeyInput").value;
    $.cookie("olapicApiKey", apiKey, { expires: 1 });

    fetch(
      "https://photorankapi-a.akamaihd.net?auth_token=" +
        apiKey +
        "&version=v2.2"
    )
      .then((customerRequest) => customerRequest.json())
      .then((customerData) => grabCustomerID(customerData))
      .catch((error) => {
        document.getElementById("apiKeyInput").value = null;
        document.getElementById("apiKeyInput").placeholder =
          "API key is  invalid";
        document.getElementById("apiKeyInput").style.color = "red";
        document.getElementById("apiKeyInput").style.border = "2px solid";
      });

    function grabCustomerID(customerData) {
      var customerID = customerData.data._embedded.customer.id;

      fetch(
        "https://photorankapi-a.akamaihd.net/customers/" +
          customerID +
          "/widgets?version=v2.2&auth_token=" +
          apiKey +
          "&count=100"
      )
        .then((widgetRequest) => widgetRequest.json())
        .then((widgetData) => grabWidgetInstance(widgetData));

      function grabWidgetInstance(widgetData) {
        var widgetInstance = widgetData.data._embedded.widgetinstance;

        function createDropDown(passedInstance) {
          var selectMenu = document.createElement("select");
          var formEl = document.getElementById("form");
          selectMenu.id = "select";
          formEl.appendChild(selectMenu);

          for (var i = 0; i < passedInstance.length; i++) {
            var option = document.createElement("option");
            option.value =
              passedInstance[i].id + " - " + passedInstance[i].type;
            option.text = passedInstance[i].name + " - " + passedInstance[i].id;
            selectMenu.appendChild(option);
          }
        }

        if (document.getElementById("select")) {
          wipeForm();
          wipeDataLang();
          createDropDown(widgetInstance);
          pdpCheck();
          createCheckbox();
          //createSubmitButton();
        } else {
          wipeSubmitOnly();
          createDropDown(widgetInstance);
          pdpCheck();
          createCheckbox();
          // createSubmitButton();
        }

        var selectChange = document.getElementById("select");
        selectChange.addEventListener("change", function (e) {
          wipeSubmitOnly();
          pdpCheck();
          URLcheck();
        });

        var checkboxClick = document.getElementById("langCheckbox");
        checkboxClick.addEventListener("click", function (e) {
          if (checkboxClick.checked == true) {
            createDataLang();
          } else {
            wipeDataLang();
          }
        });

        URLcheck();
      }
    }
  });
});
