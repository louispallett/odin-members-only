function replaceEncodedCharacters (text) {
    text = text.replace(/&amp;#x2F;|&#x2F;/g, "/");
    text = text.replace(/&amp;/g, "&");
    text = text.replace(/&#x27;/g, "'");
    text = text.replace(/&quot;/g, '"');
  
   return text;
}

module.exports = replaceEncodedCharacters;