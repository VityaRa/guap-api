const btn = document.querySelector("button");

function getDay(str) {
  if (str === "0") return "Понедельник";
  if (str === "1") return "Вторник";
  if (str === "2") return "Среда";
  if (str === "3") return "Четверг";
  if (str === "4") return "Пятница";
  if (str === "5") return "Суббота";
}

class BaseComponent {
  constructor(tag, classList) {
    this.element = document.createElement(tag);
    this.element.classList.add(...classList);
  }

  remove() {
    this.element.remove();
  }
}

const rootElement = document.getElementById("content");
// ▲
// ▼
class ListItem extends BaseComponent {
  constructor(lessonInfo) {
    super("li", ["list-item"]);
    this.element.innerHTML = `
      <div class="day-info">
        <p class="lesson__type">${lessonInfo.type}</p>
        ${this.getWeekIcon(lessonInfo)}
        <p class="lesson__number">${lessonInfo.index}</p>
      </div>
     
      <p class="lesson__time">${lessonInfo.time}</p>
      <p class="lesson__title">${lessonInfo.name}</p>
      <div class="lesson__info">
      </div>
    `;
  }

  getWeekIcon(weekInfo) {
    let weekClass = "lesson__default";
    let weekType = "";
    if (weekInfo.weekType === "upper") {
      weekType = "▲";
      weekClass = "lesson__week__upper";
    }
    if (weekInfo.weekType === "bottom") {
      weekType = "▼";
      weekClass = "lesson__week__bottom";
    }
    return `<p class="lesson__week ${weekClass}">${weekType}</p>`;
  }
}

class DayList extends BaseComponent {
  constructor(dayName, dayInfo) {
    super("ul", ["day-list"]);

    const title = new BaseComponent("h3", ["day-title"]);
    title.element.innerHTML = dayName;
    this.element.appendChild(title.element);

    dayInfo.forEach((lessonInfo) => {
      this.element.appendChild(new ListItem(lessonInfo).element);
    });
  }
}

//List takes data and contains all day lists
class List extends BaseComponent {
  constructor(data) {
    super("div", ["list"]);
    for (let dayName in data) {
      this.element.appendChild(new DayList(dayName, data[dayName]).element);
    }
  }
}

const deletePrev = () => {
  if (!rootElement.hasChildNodes) return;
  else rootElement.innerHTML = "";
};

const addNew = (data) => {
  const list = new List(data);
  rootElement.appendChild(list.element);
};

const render = (data) => {
  deletePrev();
  addNew(data);
};

const input = document.querySelector('#myInput')
console.log(input);


btn.addEventListener("click", () => {
	const inputValue = input.value
	if (!inputValue) {
		alert('Такой группы нет(')
		return
	} else
  (async function () {
    console.log("started fetching...");
		const findID = inputValue
    try {
      fetch("http://localhost:3000/" + findID, {
        method: "GET",
      })
        .then((response) => {
          if (response.status !== 200) {
            alert(`Error: ${response.status}`);
            return;
          }
          response.json().then((data) => {
            render(data);
          });
        })
        .catch(function (err) {
          console.log("Fetch Error:", err);
          alert("Такой группы нет...");
        });
    } catch (e) {
      console.log("fetch failed...");
      console.log(e);
    }
    console.log(`ended fetching...`);
  })();
});

// const recursy = ($element, className) => {
//   let data = {}

//   $element.childNodes.forEach(($node) => {
//     console.log($node);
//     if ($node.childNodes.length > 1 && $node.classList.contains(className)) {
//       data = $node
//       return
//     }
//     recursy($node, className)
//   });

//   return data
// };

// const getDOMContent = () => {
//   const $body = document.querySelector("body");
//   console.log(recursy($body, 'groups'));
// }

// window.addEventListener("DOMContentLoaded", () => {
//   getDOMContent()
// });

  let array = []

	// <option value="-1">- нет -</option>
	// <option value="12">1010М</option>
	// <option value="18">1011</option>
	// <option value="19">1012</option>
	// <option value="28">1021</option>
	// <option value="29">1022</option>
	// <option value="26">1023М</option>
	// <option value="27">1024М</option>
	// <option value="13">1026М</option>
	// <option value="73">1030М</option>
	// <option value="67">1031</option>
	// <option value="68">1032</option>
	// <option value="69">1033</option>
	// <option value="70">1035</option>
	// <option value="71">1036</option>
	// <option value="56">1040М</option>
	// <option value="50">1041</option>
	// <option value="51">1042</option>
	// <option value="52">1043</option>
	// <option value="53">1044</option>
	// <option value="54">1045</option>
	// <option value="7">1711</option>
	// <option value="8">1712</option>
	// <option value="24">1721</option>
	// <option value="25">1722</option>
	// <option value="23">1723</option>
	// <option value="66">1731</option>
	// <option value="15">1732</option>
	// <option value="64">1733</option>
	// <option value="72">1734</option>
	// <option value="32">1741</option>
	// <option value="33">1742</option>
	// <option value="34">1745</option>
	// <option value="1">1811</option>
	// <option value="2">1812</option>
	// <option value="30">1821</option>
	// <option value="31">1822</option>
	// <option value="22">1823</option>
	// <option value="14">1831</option>
	// <option value="65">1832</option>
	// <option value="3">1833</option>
	// <option value="45">1841</option>
	// <option value="46">1842</option>
	// <option value="47">1843</option>
	// <option value="48">1845К</option>
	// <option value="20">1911</option>
	// <option value="21">1912</option>
	// <option value="38">1921</option>
	// <option value="39">1922</option>
	// <option value="76">1931</option>
	// <option value="77">1932</option>
	// <option value="4">1934</option>
	// <option value="57">1941</option>
	// <option value="58">1942</option>
	// <option value="59">1944</option>
	// <option value="60">1945</option>
	// <option value="91">2010</option>
	// <option value="117">2011</option>
	// <option value="92">2015</option>
	// <option value="78">2018М</option>
	// <option value="109">2021</option>
	// <option value="110">2022</option>
	// <option value="102">2028М</option>
	// <option value="139">2030М</option>
	// <option value="132">2031</option>
	// <option value="131">2032М</option>
	// <option value="133">2033</option>
	// <option value="134">2035</option>
	// <option value="90">2035М</option>
	// <option value="118">2040</option>
	// <option value="125">2041</option>
	// <option value="116">2042М</option>
	// <option value="119">2043</option>
	// <option value="120">2046</option>
	// <option value="113">2046М</option>
	// <option value="85">2620</option>
	// <option value="86">2640</option>
	// <option value="126">2640КВ</option>
	// <option value="79">2710</option>
	// <option value="89">2715</option>
	// <option value="104">2721</option>
	// <option value="128">2731</option>
	// <option value="129">2733</option>
	// <option value="87">2735</option>
	// <option value="106">2740</option>
	// <option value="114">2740КВ</option>
	// <option value="121">2741</option>
	// <option value="107">2743</option>
	// <option value="112">2745</option>
	// <option value="111">2746</option>
	// <option value="81">2810</option>
	// <option value="80">2811</option>
	// <option value="82">2815</option>
	// <option value="83">2821</option>
	// <option value="127">2831</option>
	// <option value="108">2833</option>
	// <option value="135">2835</option>
	// <option value="84">2840</option>
	// <option value="448">2840КВ</option>
	// <option value="93">2841</option>
	// <option value="115">2845</option>
	// <option value="88">2846</option>
	// <option value="101">2910</option>
	// <option value="94">2915</option>
	// <option value="95">2921</option>
	// <option value="141">2931</option>
	// <option value="142">2933</option>
	// <option value="140">2935</option>
	// <option value="96">2941</option>
	// <option value="97">2946</option>
	// <option value="146">3010М</option>
	// <option value="154">3011</option>
	// <option value="155">3014</option>
	// <option value="156">3015</option>
	// <option value="182">3020М</option>
	// <option value="157">3021</option>
	// <option value="186">3022М</option>
	// <option value="158">3023</option>
	// <option value="187">3023М</option>
	// <option value="159">3026</option>
	// <option value="189">3030М</option>
	// <option value="194">3043</option>
	// <option value="195">3045</option>
	// <option value="199">3643</option>
	// <option value="198">3645</option>
	// <option value="149">3711</option>
	// <option value="150">3712КС</option>
	// <option value="151">3713КС</option>
	// <option value="160">3715</option>
	// <option value="165">3721</option>
	// <option value="162">3723</option>
	// <option value="184">3726</option>
	// <option value="196">3743</option>
	// <option value="197">3745</option>
	// <option value="152">3811</option>
	// <option value="153">3812КС</option>
	// <option value="147">3814</option>
	// <option value="148">3815</option>
	// <option value="166">3821</option>
	// <option value="161">3823</option>
	// <option value="167">3826</option>
	// <option value="192">3843</option>
	// <option value="193">3845</option>
	// <option value="176">3911</option>
	// <option value="177">3913К</option>
	// <option value="178">3913КС</option>
	// <option value="163">3914</option>
	// <option value="164">3915</option>
	// <option value="172">3921</option>
	// <option value="173">3922К</option>
	// <option value="174">3923</option>
	// <option value="175">3926</option>
	// <option value="143">3943</option>
	// <option value="105">3945</option>
	// <option value="136">4010</option>
	// <option value="137">4011</option>
	// <option value="214">4012М</option>
	// <option value="207">4013М</option>
	// <option value="221">4016</option>
	// <option selected="selected" value="222">4017</option>
	// <option value="223">4018К</option>
	// <option value="229">4030М</option>
	// <option value="202">4031</option>
	// <option value="234">4031М</option>
	// <option value="203">4032</option>
	// <option value="204">4033</option>
	// <option value="205">4036</option>
	// <option value="254">4040М</option>
	// <option value="252">4041</option>
	// <option value="253">4042</option>
	// <option value="255">4045М</option>
	// <option value="190">4710</option>
	// <option value="191">4711</option>
	// <option value="63">4716</option>
	// <option value="228">4731</option>
	// <option value="220">4736</option>
	// <option value="247">4741</option>
	// <option value="248">4742</option>
	// <option value="249">4743</option>
	// <option value="212">4810</option>
	// <option value="213">4811</option>
	// <option value="201">4816</option>
	// <option value="238">4831</option>
	// <option value="239">4832</option>
	// <option value="240">4836</option>
	// <option value="242">4841</option>
	// <option value="243">4842</option>
	// <option value="244">4843</option>
	// <option value="180">4910</option>
	// <option value="181">4911</option>
	// <option value="209">4916</option>
	// <option value="210">4917</option>
	// <option value="211">4918</option>
	// <option value="230">4931</option>
	// <option value="231">4932</option>
	// <option value="232">4933</option>
	// <option value="233">4936</option>
	// <option value="225">4941</option>
	// <option value="226">4942</option>
	// <option value="266">5010М</option>
	// <option value="260">5011</option>
	// <option value="261">5012</option>
	// <option value="262">5013</option>
	// <option value="265">5014М</option>
	// <option value="257">5021</option>
	// <option value="258">5022</option>
	// <option value="259">5023</option>
	// <option value="224">5030М</option>
	// <option value="298">5031</option>
	// <option value="299">5036</option>
	// <option value="300">5037</option>
	// <option value="301">5038</option>
	// <option value="263">5711</option>
	// <option value="264">5712</option>
	// <option value="122">5721</option>
	// <option value="123">5722</option>
	// <option value="124">5723</option>
	// <option value="294">5731</option>
	// <option value="295">5736</option>
	// <option value="296">5737</option>
	// <option value="297">5738</option>
	// <option value="40">5811</option>
	// <option value="41">5812</option>
	// <option value="42">5821</option>
	// <option value="43">5822</option>
	// <option value="44">5823</option>
	// <option value="200">5831</option>
	// <option value="291">5836</option>
	// <option value="292">5837</option>
	// <option value="293">5838</option>
	// <option value="144">5911</option>
	// <option value="145">5912</option>
	// <option value="98">5921</option>
	// <option value="99">5922</option>
	// <option value="100">5923</option>
	// <option value="302">5931</option>
	// <option value="303">5932</option>
	// <option value="304">5936</option>
	// <option value="305">5937</option>
	// <option value="306">5938</option>
	// <option value="308">6010М</option>
	// <option value="385">6020М</option>
	// <option value="334">6021К</option>
	// <option value="336">6027</option>
	// <option value="337">6028К</option>
	// <option value="335">6029К</option>
	// <option value="368">6030М</option>
	// <option value="338">6031</option>
	// <option value="339">6032К</option>
	// <option value="340">6033К</option>
	// <option value="384">6727К</option>
	// <option value="412">6729</option>
	// <option value="387">6731К</option>
	// <option value="388">6732К</option>
	// <option value="279">6821К</option>
	// <option value="280">6831К</option>
	// <option value="281">6832К</option>
	// <option value="235">6833К</option>
	// <option value="282">6834К</option>
	// <option value="323">6921К</option>
	// <option value="324">6922К</option>
	// <option value="371">6927К</option>
	// <option value="367">6929К</option>
	// <option value="327">6931</option>
	// <option value="328">6932К</option>
	// <option value="329">6933К</option>
	// <option value="330">6934К</option>
	// <option value="55">7041ВЦ</option>
	// <option value="16">7731ВЦ</option>
	// <option value="17">7732ВЦ</option>
	// <option value="62">7741ВЦ</option>
	// <option value="417">7761ВЦ</option>
	// <option value="9">7831ВЦ</option>
	// <option value="10">7832ВЦ</option>
	// <option value="49">7841ВЦ</option>
	// <option value="103">7861ВЦ</option>
	// <option value="5">7931ВЦ</option>
	// <option value="6">7932ВЦ</option>
	// <option value="61">7941ВЦ</option>
	// <option value="74">7961ВЦ</option>
	// <option value="344">8011К</option>
	// <option value="418">8015М</option>
	// <option value="346">8021К</option>
	// <option value="208">8025М</option>
	// <option value="364">8026</option>
	// <option value="365">8027</option>
	// <option value="350">8033К</option>
	// <option value="347">8035</option>
	// <option value="348">8036К</option>
	// <option value="349">8037К</option>
	// <option value="345">8041К</option>
	// <option value="353">8046К</option>
	// <option value="354">8051К</option>
	// <option value="429">8633К</option>
	// <option value="414">8646К</option>
	// <option value="415">8647К</option>
	// <option value="416">8648К</option>
	// <option value="419">8718К</option>
	// <option value="422">8721К</option>
	// <option value="420">8726</option>
	// <option value="421">8727</option>
	// <option value="428">8733К</option>
	// <option value="426">8735К</option>
	// <option value="427">8736К</option>
	// <option value="430">8746К</option>
	// <option value="431">8747К</option>
	// <option value="433">8752К</option>
	// <option value="267">8811К</option>
	// <option value="268">8818К</option>
	// <option value="287">8821К</option>
	// <option value="217">8826</option>
	// <option value="218">8827</option>
	// <option value="269">8831К</option>
	// <option value="276">8833К</option>
	// <option value="288">8835К</option>
	// <option value="289">8836К</option>
	// <option value="270">8841К</option>
	// <option value="369">8846К</option>
	// <option value="370">8847К</option>
	// <option value="290">8852К</option>
	// <option value="372">8911К</option>
	// <option value="394">8918К</option>
	// <option value="395">8921К</option>
	// <option value="35">8926</option>
	// <option value="396">8931К</option>
	// <option value="397">8933К</option>
	// <option value="398">8934К</option>
	// <option value="399">8935К</option>
	// <option value="400">8936К</option>
	// <option value="373">8941К</option>
	// <option value="325">8946К</option>
	// <option value="326">8947К</option>
	// <option value="374">8951К</option>
	// <option value="375">8952К</option>
	// <option value="440">9020МК</option>
	// <option value="355">9032К</option>
	// <option value="356">9033К</option>
	// <option value="357">9034К</option>
	// <option value="358">9036К</option>
	// <option value="443">9040М</option>
	// <option value="351">9051К</option>
	// <option value="352">9052К</option>
	// <option value="366">9060КВ</option>
	// <option value="444">9651К</option>
	// <option value="445">9652К</option>
	// <option value="446">9653К</option>
	// <option value="434">9732К</option>
	// <option value="435">9733К</option>
	// <option value="436">9734К</option>
	// <option value="437">9735К</option>
	// <option value="438">9737КС</option>
	// <option value="439">9738КС</option>
	// <option value="423">9740</option>
	// <option value="381">9751К</option>
	// <option value="382">9752К</option>
	// <option value="383">9753К</option>
	// <option value="271">9832К</option>
	// <option value="272">9833К</option>
	// <option value="273">9834К</option>
	// <option value="274">9835К</option>
	// <option value="275">9836К</option>
	// <option value="406">9837КС</option>
	// <option value="407">9838КС</option>
	// <option value="219">9840</option>
	// <option value="277">9851К</option>
	// <option value="278">9852К</option>
	// <option value="401">9932К</option>
	// <option value="402">9933К</option>
	// <option value="403">9934К</option>
	// <option value="404">9935К</option>
	// <option value="405">9936К</option>
	// <option value="441">9937КС</option>
	// <option value="377">9951К</option>
	// <option value="378">9952К</option>
	// <option value="442">9961КСВ</option>
	// <option value="309">А0121</option>
	// <option value="310">А0131</option>
	// <option value="311">А0132</option>
	// <option value="312">А0211К</option>
	// <option value="313">А0221</option>
	// <option value="314">А0231</option>
	// <option value="315">А0311К</option>
	// <option value="316">А0321К</option>
	// <option value="317">А0441</option>
	// <option value="318">А0521</option>
	// <option value="319">А0811К</option>
	// <option value="320">А0941К</option>
	// <option value="321">А0М21</option>
	// <option value="322">А0М52К</option>
	// <option value="183">В0326</option>
	// <option value="256">В0441</option>
	// <option value="185">В6326</option>
	// <option value="250">В6441</option>
	// <option value="188">В7326</option>
	// <option value="251">В7441</option>
	// <option value="168">В8326</option>
	// <option value="227">В8441</option>
	// <option value="138">В9326</option>
	// <option value="245">В9441</option>
	// <option value="341">И0621К</option>
	// <option value="342">И0626К</option>
	// <option value="386">И062МК</option>
	// <option value="461">И0811МК</option>
	// <option value="425">И0851МК</option>
	// <option value="343">И0852К</option>
	// <option value="460">И0М52МК</option>
	// <option value="130">И7231КС</option>
	// <option value="413">И7626К</option>
	// <option value="432">И7851К</option>
	// <option value="283">И8621К</option>
	// <option value="284">И8626К</option>
	// <option value="236">И8633К</option>
	// <option value="285">И8851К</option>
	// <option value="286">И8852К</option>
	// <option value="307">И9626К</option>
	// <option value="333">И9636К</option>
	// <option value="376">И9852К</option>
	// <option value="447">М010М</option>
	// <option value="206">М011</option>
	// <option value="215">М020М</option>
	// <option value="359">М021</option>
	// <option value="360">М022</option>
	// <option value="361">М023</option>
	// <option value="362">М050</option>
	// <option value="363">М051</option>
	// <option value="451">М055М</option>
	// <option value="170">М056</option>
	// <option value="453">М057М</option>
	// <option value="454">М058М</option>
	// <option value="169">М061</option>
	// <option value="455">М061М</option>
	// <option value="179">М062</option>
	// <option value="246">М711</option>
	// <option value="424">М721</option>
	// <option value="450">М750</option>
	// <option value="456">М751</option>
	// <option value="457">М753КС</option>
	// <option value="458">М754КС</option>
	// <option value="452">М756</option>
	// <option value="459">М758КС</option>
	// <option value="449">М761</option>
	// <option value="241">М811</option>
	// <option value="216">М821</option>
	// <option value="389">М850</option>
	// <option value="390">М851</option>
	// <option value="391">М852</option>
	// <option value="408">М853КС</option>
	// <option value="409">М854КС</option>
	// <option value="392">М856</option>
	// <option value="410">М858КС</option>
	// <option value="393">М861</option>
	// <option value="11">М862</option>
	// <option value="411">М862КС</option>
	// <option value="237">М911</option>
	// <option value="36">М921</option>
	// <option value="37">М922</option>
	// <option value="331">М950</option>
	// <option value="332">М951</option>
	// <option value="379">М953КС</option>
	// <option value="380">М954КС</option>
	// <option value="171">М956</option>
	// <option value="75">М961</option>