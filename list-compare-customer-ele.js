// A custom HTML element class intended to be integrated into the WIX platform
const no_match_msg = "<p> Wo! There are no matches in our list.</p>";
const match_msg = "<p>Unforunatly there are matches.</p>";
// Source list to compare against
const ctrl_array = [
        "Acetylated Lanolin",
        "Acetylated Lanolin Alcohol",
        "Algae Extract",
        "Algin",
        "Beeswax",
        "Bismuth",
        "Butyl Stearate",
        "Carrageenan",
        "Cetearyl Alcohol",
        "Ceteareth 20",
        "Cetyl Acetate",
        "Chlorella",
        "Chondrus Crispus",
        "Irish Moss",
        "Carageenan Moss",
        "Coal Tar",
        "Cocoa Butter",
        "Coconut Alkanes",
        "Coconut Butter",
        "Coconut Oil",
        "Cocos nucifera oil",
        "Colloidal Sulfur",
        "Cotton Awws Oil",
        "Cotton Seed Oil",
        "Corn oil",
        "D & C Red # 17",
        "D & C Red # 21",
        "D & C Red # 3",
        "D & C Red # 30",
        "D & C Red # 36",
        "Decyl Oleate",
        "Dioctyl Succinate",
        "Disodium Monooleamido",
        "Ethoxylated Lanolin",
        "Ethylhexyl Palmitate",
        "Glyceryl Stearate SE",
        "Glyceryl-3 Diisostearate",
        "Hexadecyl Alcohol",
        "Hydrogenated Vegetable Oil",
        "Isocetyl Alcohol",
        "Isocetyl Stearate",
        "Isodecyl Oleate",
        "Isopropyl Isostearate",
        "Isopropyl Linolate",
        "Isopropyl Myristate",
        "Isopropyl Palmitate",
        "Isostearyl Isostearate",
        "Isostearyl Neopentanoate",
        "Jojoba wax",
        "Kelp",
        "Laminaria Digitata Extract",
        "Laminaria Saccharina Extract",
        "Laminaria Saccharine",
        "Laureth-23",
        "Laureth-4",
        "Lauric Acid",
        "Mango Butter",
        "Mink Oil",
        "Myristic Acid",
        "Myristyl Lactate",
        "Myristyl Myristate",
        "Octyl Palmitate",
        "Octyl Stearate",
        "Oleth-3",
        "Oleyl Alcohol",
        "Parkii",
        "PEG 2- Sulfosuccinate",
        "PEG 16 Lanolin",
        "PEG 200 Dilaurate",
        "PEG 8 Stearate",
        "PG Monostearate",
        "PPG 2 Myristyl Propionate",
        "Plankton",
        "Polyglyceryl-3 Diisostearate",
        "Potassium Chloride",
        "Propylene Glycol Monostearate",
        "Red Algae",
        "Seaweed",
        "Shark Liver Oil",
        "Shea",
        "Shea Butter",
        "Sodium Laureth Sulfate",
        "Sodium Lauryl Sulfate",
        "Solulan 16",
        "Sorbitan Oleate",
        "Soybean Oil",
        "Spirulina",
        "Steareth 10",
        "Stearic Acid Tea",
        "Stearyl Heptanoate",
        "Sulfated Castor Oil",
        "Sulfated Jojoba Oil",
        "Talc",
        "Wheat Germ Glyceride",
        "Wheat Germ Oil",
        "Xylene"
    ];

class ListCompare extends HTMLElement {
    connectedCallback() {
        let htmlPage = ' <style>'+
                    '     .flex-container {'+
                    '         display: flex;'+
                    '         flex-direction: column;'+
                    '         flex-wrap: no;'+
                    '         align-items: center;'+
                    '         justify-content: center;'+
                    '         padding: 10px;'+
                    '         margin: 10px;'+
                    '         min-height: 550px;'+
                    '     }'+
                    '     #checker_chk_btn {background-color: black;'+
                    '                         color: white;'+
                    '                         border: .5px solid black;'+
                    '                         border-radius: 2px;'+
                    '                         padding: 15px 20px 15px 20px;;'+
                    '                         text-align: center;'+
                    '                         text-decoration: none;'+
                    '                         display: inline-block;'+
                    '                         font-size: 16px;'+
                    '                         margin: 4px 10px;'+
                    '                         cursor: pointer;}'+
                    '     #checker_clr_btn {background-color: white;'+
                    '                         color: black;'+
                    '                         border: .5px solid black;'+
                    '                         border-radius: 2px;'+
                    '                         padding: 15px 20px 15px 20px;'+
                    '                         text-align: center;'+
                    '                         text-decoration: none;'+
                    '                         display: inline-block;'+
                    '                         font-size: 16px;'+
                    '                         cursor: pointer;}'+
                    '     #src_ingredients {  width: 100%;'+
                    '                         height: 200px;'+
                    '                         padding: 15px;'+
                    '                         box-sizing: border-box;'+
                    '                         border: .5px solid black;'+
                    '                         border-radius: 4px;'+
                    '                         background-color: #f8f8f8;'+
                    '                         resize: auto;}'+
                    '     #checker_results {  width: 100%;'+
                    '                         padding: 10px;'+
                    '                         box-sizing: border-box;'+
                    '                         border: .5px solid black;'+
                    '                         border-radius: 4px;'+
                    '                         background-color: #f8f8f8;'+
                    '                         color: red;'+
                    '                         resize: no;}'+
                    '     p {  font-size: 11pt; }'+
                    ' </style>'+
                    ' <div class="flex-container">'+
                    '     <div style="margin: 10px;'+
                    '                 font-size: 24pt;'+
                    '                 margin-bottom: 20px;">'+
                    '         <label id="widget_label">Check Your Product</label>' +
                    '     </div>'+
                    '     <div style="width: 100%;">'+
                    '         <textarea id="src_ingredients" placeholder="Insert your product ingredients here"></textarea>'+
                    '     </div>'+
                    '     <div style="margin: 10px;">'+
                    '         <button id="checker_chk_btn">CHECK</button>'+
                    '         <button id="checker_clr_btn">CLEAR</button>'+
                    '     </div>'+
                    '     <div style="visibility: hidden;'+
                    '                 width: 100%;'+
                    '                 padding: 10px;'+
                    '                 margin: 10px; '+
                    '                 flex-grow: inherit;flex-shrink: inherit;" id="checker_results_notice">'+
                    '     </div>'+
                    '     <div style="visibility: hidden;'+
                    '                 width: 100%; ' +
                    '                 overflow-y:auto; ' +
                    '                 max-height:65px; ' + 
                    '                 font-size:11pt; ' + 
                    '                 flex-grow: inherit;" id="checker_results">'+
                    '     </div>'
        
        this.innerHTML = htmlPage;
        this.style.minHeight= "515px";
        // Register listeners for html button elements
        const chk_btn = document.querySelector("#checker_chk_btn");
        chk_btn.addEventListener("click", searchList);

        const clr_btn = document.querySelector("#checker_clr_btn");
        clr_btn.addEventListener("click", clearAll);

        function searchList() {
            // Compare a list of ingredients and report which ones match
            src_ingredients = document.getElementById("src_ingredients").value;
            // Create arrays from the comma separated lists and convert to uppercase
            src_array = src_ingredients.split(",").map(function(item) {
                return item.trim();
            });    

            let result = compareArrays(src_array, ctrl_array);
                    
            if (result.length > 0) {
                htmlresult = htmlArray(result);                
                document.getElementById("checker_results_notice").innerHTML = match_msg;
                document.getElementById("checker_results").innerHTML = htmlresult;
            }

            if (result.length == 0) {
                document.getElementById("checker_results_notice").innerHTML = no_match_msg;
                document.getElementById("checker_results").innerHTML = "";
            }

            document.getElementById("checker_results_notice").style.visibility='visible';
            chkr_result = document.getElementById("checker_results")
            chkr_result.style.visibility='visible';
            chkr_result.scrollIntoView({behavior: "smooth", block: "start"});
        };

        function htmlArray(arr) { 
            // Convert an array to a string of HTML elements
            var result = "";
            for (var i = 0; i < arr.length; i++) {
                result += arr[i] + "<br>";
            }
            return result;
        };

        function compareArrays(src_array, ctrl_array) {
        // Compare each value in the source array to the control array then report the matches
            let result = [];
            
            for (let ol_index = 0; ol_index < src_array.length; ol_index++) {
                for (let il_index = 0; il_index < ctrl_array.length; il_index++) {
                    if (ctrl_array[il_index].toUpperCase() == src_array[ol_index].toUpperCase() && 
                        src_array[ol_index] != "") {
                        text = ctrl_array[il_index].toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
                        result.push(text);
                    }        
                }
            }
            return result;
        };

        function clearAll() {
            document.getElementById('src_ingredients').value = "";
            document.getElementById("checker_results").style.visibility='hidden';
            document.getElementById("checker_results_notice").style.visibility='hidden';
            document.getElementById('widget_label').scrollIntoView({behavior: "smooth", block: "start"});
        };
    };  
  }
customElements.define('list-compare', ListCompare);
  
$w.CustomElementRegistry.define('list-compare', ListCompare);
