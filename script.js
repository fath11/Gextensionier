var i = 0;
function duplicateDiv() {
  var myDiv = document.getElementById("block");
  var divClone = myDiv.cloneNode(true); // deep cloning
  divClone.id = "block" + ++i; // unique id for the clone

  // Update IDs of input fields in cloned div
  var inputs = divClone.getElementsByTagName('input');
  for (var j = 0; j < inputs.length; j++) {
    inputs[j].id = inputs[j].id + i;
    inputs[j].oninput = function() { update_func_name_in_func_content(this.parentNode.nextElementSibling, this.value); };
  }

  // Update IDs of select fields in cloned div
  var selects = divClone.getElementsByTagName('select');
  for (var j = 0; j < selects.length; j++) {
    selects[j].id = selects[j].id + i;
  }

  myDiv.parentNode.appendChild(divClone); // append clone to parent of original div
}

function reload_code_preview() {
  var blocks = document.getElementsByClassName('block');
  for (var i = 0; i < blocks.length; i++) {
    var codePreview = blocks[i].querySelector('#codepreview');
    if (codePreview) {
      var opcode = document.getElementById('opcode' + (i === 0 ? '' : i));
      var blocktype = document.getElementById('blocktypes' + (i === 0 ? '' : i));
      var isterminal = document.getElementById('isTerminal' + (i === 0 ? '' : i));
      var blockallthreads = document.getElementById('blockAllThreads' + (i === 0 ? '' : i));
      var text = document.getElementById('text' + (i === 0 ? '' : i));
      var func = document.getElementById('func' + (i === 0 ? '' : i));

      if (opcode && blocktype && isterminal && blockallthreads && text && func) {
        codePreview.innerHTML = `{
        <br>opcode:'${opcode.value}',
        <br>blockType: Scratch.BlockType.${blocktype.value},
        <br> isTerminal: ${isterminal.value},
        <br> blockAllThreads: ${blockallthreads.value},
        <br> text: '${text.value}',
        <br> func: '${func.value}',
        <br>},`
      }
    }
  }
}

function update_full_code() {
  var blocks = document.getElementsByClassName('block');
  var fullcode = document.querySelector('.fullcode');
  fullcode.innerHTML = "blocks: ["
  for (var i = 0; i < blocks.length; i++) {
    if (fullcode) {
      var opcode = document.getElementById('opcode' + (i === 0 ? '' : i));
      var blocktype = document.getElementById('blocktypes' + (i === 0 ? '' : i));
      var isterminal = document.getElementById('isTerminal' + (i === 0 ? '' : i));
      var blockallthreads = document.getElementById('blockAllThreads' + (i === 0 ? '' : i));
      var text = document.getElementById('text' + (i === 0 ? '' : i));
      var func = document.getElementById('func' + (i === 0 ? '' : i));

      if (opcode && blocktype && isterminal && blockallthreads && text && func) {
        fullcode.innerHTML += `<br> {
        <br> opcode:'${opcode.value}',
        <br> blockType: Scratch.BlockType.${blocktype.value},
        <br> isTerminal: ${isterminal.value},
        <br> blockAllThreads: ${blockallthreads.value},
        <br> text: '${text.value}',
        <br> func: '${func.value}',
        <br> },`
      }
    }
  }
  fullcode.innerHTML += "<br>]"
}

function update_func_name_in_func_content(funcContent, func) {

  // Find the position of "function" and "()"
  var functionPosition = funcContent.textContent.indexOf("function") + "function".length;
  var parenthesesPosition = funcContent.textContent.indexOf("()");

  // Check if "function" and "()" are found and in the correct order
  if (functionPosition > -1 && parenthesesPosition > -1 && functionPosition < parenthesesPosition) {
    // Split the textbox value into three parts
    var textBeforeFunction = funcContent.textContent.substring(0, functionPosition);
    var textAfterParentheses = funcContent.textContent.substring(parenthesesPosition);

    // Replace the text between "function" and "()" and update the textbox value
    funcContent.textContent = textBeforeFunction + " " + func + textAfterParentheses;
  } else {
    console.log('"function" or "()" not found, or not in the correct order');
  }
}


