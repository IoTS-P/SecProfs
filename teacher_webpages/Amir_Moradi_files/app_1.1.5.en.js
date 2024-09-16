function isMobile(){
return 'ontouchstart' in document.documentElement;
}
function normalizeCarouselItems(sliderId, indicatorsBelowCaption, cycle){
if(true==cycle && !isMobile() && $(window).width() >= 800){
$(sliderId).carousel('cycle');
}
$(sliderId+' .carousel-item').addClass("d-block");
$(sliderId+' .carousel-control').height($(sliderId).find(".active img:first").height());
var captions = $(sliderId).find('figcaption');
var maxCaptionHeight = Math.max(...captions.map(function(){return $(this).height()} ).get());
captions.height(maxCaptionHeight);
var positionTop = Math.max.apply(null, $(sliderId).find('img').map(function(){ return $(this).height()} ).get());
if(true==indicatorsBelowCaption){
positionTop += maxCaptionHeight;
}
$(sliderId + ' .cust-indicators, ' + sliderId + ' .pause-button').css('top', positionTop + 'px');
$(sliderId + ' .carousel-item').removeClass("d-block");
}
function copyContactInfos(){
$('.showcontactdetails').each(function(){
var tr = $(this).parents("tr");
var table = tr.parents("table");
var workingareas = tr.find('td.working-areas');
var communicationdetails = tr.find('td.communication-details');
tr.after(
$("<tr/>",{
class:"contactdetails collapse hide d-md-none",
id:tr.attr("id") + "_details"
})
.append($("<td/>",{
class:"pt-0",
colspan:tr.children("td").length,
style:"border-top-width:0"
})
.append(
tr.find('div.jobtitle').html()
)
.append(
$("<div/>",{class:"row"})
.append(
(workingareas.length>0 && workingareas.html().length>0)?
'<div class="col-12 col-sm-6">'
+ '<div class="strong sans-h6 text-gr1 pt-2 pb-1">'
+ table.find("th.working-areas-head").text()
+ '<\/div>'
+ workingareas.html()
+ '<\/div>'
:''
)
.append(
communicationdetails.html().length>0?
'<div class="col-12 col-sm-6">'
+ '<div class="strong sans-h6 text-gr1 pt-2 pb-1">'
+ table.find("th.communication-details-head").text()
+ '<\/div>'
+ communicationdetails.html()
+ '<\/div>'
:''
)
)
)
);
});
}
function setTuDaCookie(name, value){
if(!Cookies.get("cookie-consent") || Cookies.get("cookie-consent")=="*" || Cookies.get("cookie-consent").includes("usability")){
Cookies.set(
name,
value,
{
expires: 30,
domain: '.tu-darmstadt.de',
path: '/',
sameSite: 'lax',
secure: true
}
);
}
}
function removeTuDaCookie(name){
Cookies.remove(
name,
{
domain:'.tu-darmstadt.de',
path:'/'
}
);
}
function showSectionWithHash(){
let $item = $(window.location.hash + "_content.collapse");
if($item.length){
$item.collapse("show");
}
}
jQuery(function($){
$('.skip-link').click(function(){
$('#site-main').focus();
});
$('.lazy').Lazy({
threshold:550
});
$(".textfit").dotdotdot({
height:"watch",
truncate:"letter",
watch:true
});
$(".carousel").on("touchstart", function(event){
var xClick = event.originalEvent.touches[0].pageX;
$(this).one("touchmove", function(event){
var xMove = event.originalEvent.touches[0].pageX;
if( Math.floor(xClick - xMove) > 5 ){
$(this).carousel('next');
}
else if( Math.floor(xClick - xMove) < -5 ){
$(this).carousel('prev');
}
});
$(".carousel").on("touchend", function(){
$(this).off("touchmove");
});
});
$(".pause-button").click(function(event){
if($(this).hasClass("paused")){
$(this).removeClass("paused");
$(this).children(".icon").removeClass("fa-play-circle").addClass("fa-pause-circle");
$(this).parent(".carousel").carousel('cycle');
$(this).children(".sr-only").text("Pause");
}
else{
$(this).addClass("paused");
$(this).children(".icon").removeClass("fa-pause-circle").addClass("fa-play-circle");
$(this).parent(".carousel").carousel('pause');
$(this).children(".sr-only").text("Play");
}
});
$("#institution-name").each(function(){
var textwidth = $(this).width();
var framewidth = $("#institution-name-container").width();
if(textwidth > framewidth){
var scalefactor = framewidth/textwidth;
$(this).css('transform-origin', '0 0').css('transform', 'scaleX('+ scalefactor +')');
$("#institution-name-container").css('transform-origin', '0 0').css('transform', 'scaleY('+ scalefactor +')');
}
});
$("a.language-selector").click(function(e){
var language = $(this).text();
if(language != "Deutsch"){
setTuDaCookie('sprache', language);
}else{
removeTuDaCookie('sprache');
}
});
$('a.email').each(function(){
var attrname="";
if($(this).attr("rel")){
attrname="rel";
}
else{
if($(this).attr("data-ref")){
attrname="data-ref";
}
}
if(attrname){
var email = decodeURIComponent($(this).attr(attrname)).replace('/','@').replace('mailto:','');
$(this).removeAttr(attrname);
$(this).attr("href","mailto:"+email);
$(this).attr("title","E-mail to: "+email);
}
});
$('span.email').each(function(){
var emailtext=$(this).text();
var email=emailtext.replace("tu-…","tu-darmstadt.de").replace("tu-...","tu-darmstadt.de");
$(this).replaceWith('<a class="link email" itemprop="email" href="mailto:'+email+'" title="E-mail to: '+email+'"><span class="icon far fa-envelope"><\/span>' + emailtext + '<\/a>');
});
$('span.tel').each(function(){
var tel=$(this).text().replace(/work|cell|\(0\)|[\/\s]/g,"");
var protocol = "tel";
//if(!isMobile()) protocol = "callto";
if(tel.substring(0,1)=="-" && tel.length <= 6){
tel = "+49615116" + tel; //Durchwahl? Ergänze mit Hauptwahl
}
else{
if(tel.substring(0,1)=="0"){
tel = "+49" + tel.substring(1); //Startet mit 0? Ergänze +49
}
else{
if(tel.substring(0,1)!="+"){
tel = "+496151" + tel; //keine Vorwahl angegeben? Ergänze Vorwahl von Darmstadt
}
}
}
$(this).replaceWith('<a class="link tel" itemprop="telephone" href="'+protocol+':'+tel+'" title="Call: '+tel+'">' + ($(this).has('.icon').length==0?'<span class="icon far fa-phone-alt"><\/span>':'') +$(this).html()+'<\/a>');
});
$('.equal-height').each(function(){
$(this).css("max-height", $(this).prev().find("figure").height()+"px");
});
if($(window).width() >= 500){
$('.equal-height-sm').each(function(){
$(this).css("max-height", $(this).prev().find("figure").height()+"px");
});
}
if($(window).width() >= 800){
$('.equal-height-md').each(function(){
$(this).css("max-height", $(this).prev().find("figure").height()+"px");
});
}
$(window).on("scroll", function() {
if($(window).scrollTop() > $(window).height()){
$('#btn-top').removeClass("invisible");
}
else{
$('#btn-top').addClass("invisible");
}
});
/* enable ekkoLightbox */
$("a.lightbox").click(function(e){
e.preventDefault();
$(this).ekkoLightbox({
alwaysShowClose: true
});
});
/* readmore-Links */
$(".readmore")
.removeClass("d-none")
.each(function(){
$(this).parent().nextAll().not("div")
.wrapAll("<div class=\"readmoreContainer collapse stack-2\"/>")
.last().after(
'<p class="sans-body mt-1"><button class="close-readmore link strong">close<span class="icon fas fa-angle-up"><\/span><\/button><\/p>'
);
})
.click(function(e){
e.preventDefault();
$(this).addClass("d-none");
$(this).parent().next(".readmoreContainer").slideDown();
});
$(".close-readmore")
.hover(function(){
$(this).parent().prevAll().fadeTo("fast",.5);
},
function(){
$(this).parent().prevAll().fadeTo("fast",1);
}
)
.click(function(e){
e.preventDefault();
$(this).parents(".readmoreContainer")
.slideUp()
.prev().find(".readmore").removeClass("d-none");
});
/* Additional collapse features */
//If shown|hidden.bs.collapse add the unique id to local storage
$(".collapsable-section, .collapsable-content").on("show.bs.collapse", function () {
sessionStorage.setItem("coll_" + pageId + "_" + this.id, "show");
});
$(".collapsable-section, .collapsable-content").on("hide.bs.collapse", function () {
sessionStorage.setItem("coll_" + pageId + "_" + this.id, "hide");
});
//If the key exists and is set to true, show the collapsed, otherwise hide
$(".collapsable-section, .collapsable-content").each(function () {
let itemState = sessionStorage.getItem("coll_" + pageId + "_" + $(this).attr("id"));
if(itemState != null) {
$(this).collapse(itemState);
}
});
$('.collapse-show-all').click(function(){
$(this).parents("section").find(".collapse").collapse("show");
});
$('.collapse-hide-all').click(function(){
$(this).parents("section").find(".collapse").collapse("hide");
});
/* A-Z index */
$(".show-list").click(function(e){
e.preventDefault();
$(this).removeClass("text-gr1").addClass("text-gr0");
let $parentLi = $(this).parent("li");
$parentLi.removeClass("border-gr3 ml-1 mr-1").addClass("border-gr0");
$parentLi.siblings()
.removeClass("border-gr0 ml-1 mr-1").addClass("border-gr3")
.find(".show-list")
.removeClass("text-gr0").addClass("text-gr1");
$parentLi.prev().addClass("mr-1");
$parentLi.next().addClass("ml-1");
if($(this).attr("id")=="show-all"){
$(this)
.parents("section")
.find(".sublist")
.removeClass("d-none");
}
else{
$(this)
.parents("section")
.find("#list_" + $(this).text())
.removeClass("d-none")
.siblings(".sublist").addClass("d-none");
}
$("#" + $(this).attr("aria-controls")).focus();
});
if(window.location.hash && window.location.hash.length>1){
let $item = $('a.show-list[href="' + window.location.hash +'"]');
if($item.length){
$item.trigger("click");
}
else{
showSectionWithHash();
}
}
$(window).on('hashchange', function( e ) {
showSectionWithHash();
});
});
function _getScrollbarWidth() {
const scrollDiv = document.createElement('div');
scrollDiv.setAttribute('style', 'width: 100px; height: 100px; overflow: scroll; position: absolute; top: -9999px;');
document.body.appendChild(scrollDiv);
const scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
document.body.removeChild(scrollDiv);
return scrollbarWidth;
}
var headroomOptions = {
offset: 260,
classes: {
initial: 'hr',
pinned: 'hr--pinned',
unpinned: 'hr--unpinned',
top: 'hr--top',
notTop: 'hr--not-top',
bottom: 'hr--bottom',
notBottom: 'hr--not-bottom'
}
};
// DESKTOP MENU
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }
function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }
const desktopMenu = {
props: ['sitemap', 'fastBlocks', 'menuPath'],
data: function(){
return{
path: '',
focPath: '',
fastIsOpen: false,
menuPathDesktop: [].concat(menuPath),
selectedHeightTemp: 0,
selectedLevelsTemp: [],
modalIsOpen: false,
searchIsOpen: false,
scrollbarWidth: 0,
chevronIcon: '<span class="icon fas fa-angle-right ml"></span>'
}
},
computed: {
modalOpenStyle: function modalOpenStyle() {
return {
paddingRight: this.modalIsOpen ? "".concat(this.scrollbarWidth, "px") : '0px'
};
},
shifted: function shifted() {
return this.searchIsOpen || this.fastIsOpen;
},
isTouch: function isTouch() {
return !!('ontouchstart' in window) || window.navigator.msMaxTouchPoints > 0;
}
},
methods: {
iconifyLastWord: function iconifyLastWord(str) {
str = str.trim();
var chars = [{
char: ' ',
len: 1
}, {
char: '&shy;',
len: 5
}];
var _chars$sort$ = chars.sort(function (a, b) {
a.idx = str.lastIndexOf(a.char);
b.idx = str.lastIndexOf(b.char);
return a.idx < b.idx;
})[0],
char = _chars$sort$.char,
len = _chars$sort$.len,
idx = _chars$sort$.idx;
var result = idx > 0 ? [str.slice(0, idx), str.slice(idx + len)] : ['', str];
result[1] = "<span class=\"nobr\">".concat(result[1], " ").concat(this.chevronIcon, "</span>");
return result.join(char == '&shy;' ? '&shy;&#8204;' : ' ');
},
// classes
fastBlockBgClass: function fastBlockBgClass(key, isActive) {
key = isActive ? key : 'gr4';
return "bg-".concat(key, " score-").concat(key);
},
fastBlockOverClass: function fastBlockOverClass(key, isActive) {
return "text-".concat(key, " ").concat(isActive ? '' : 'active');
},
fastBlockTextClass: function fastBlockTextClass(key, isActive) {
return "text-white ".concat(isActive ? 'active' : '');
},
// focusing
hoverFocus: function hoverFocus(event) {
if (this.isTouch) return false;
if (this.path.length) event.target.focus();
},
clickSelf: function clickSelf(event) {
event.target.click();
},
onEsc: function onEsc() {
document.activeElement.blur();
window.focus();
this.path = '';
},
refPath: function refPath(key) {
for (var _len = arguments.length, n = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
n[_key - 1] = arguments[_key];
}
return key + '-' + n.join('-');
},
getRef: function getRef(ref) {
var targets = this.$refs[ref];
return targets ? Array.isArray(targets) ? targets[0] : targets : null;
},
setFocus: function setFocus(ref) {
var refEl = this.getRef(ref);
refEl && this.$nextTick(function () {
return refEl.focus();
});
},
setParentFocus: function setParentFocus() {
var _this = this;
for (var _len2 = arguments.length, n = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
n[_key2] = arguments[_key2];
}
this.setPath.apply(this, _toConsumableArray(n.slice(0, -1)));
this.$nextTick(function () {
return _this.setFocus(_this.refPath.apply(_this, ['main'].concat(n)));
});
},
setSubFocus: function setSubFocus() {
var _this2 = this;
for (var _len3 = arguments.length, n = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
n[_key3] = arguments[_key3];
}
if (this.isPath.apply(this, n)) return this.setPath.apply(this, _toConsumableArray(n.slice(0, -1)));
this.setPath.apply(this, n);
this.$nextTick(function () {
return _this2.setFocus(_this2.refPath.apply(_this2, ['main'].concat(n, [-1])));
});
},
// refs
itemRef: function itemRef(key) {
for (var _len4 = arguments.length, n = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
n[_key4 - 1] = arguments[_key4];
}
return key + '-' + n.join('-');
},
// paths
setPath: function setPath() {
for (var _len5 = arguments.length, n = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
n[_key5] = arguments[_key5];
}
this.path = n.join('-');
},
hasPath: function hasPath() {
for (var _len6 = arguments.length, n = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
n[_key6] = arguments[_key6];
}
return new RegExp("^".concat(n.join('-'))).test(this.path);
},
isPath: function isPath() {
for (var _len7 = arguments.length, n = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
n[_key7] = arguments[_key7];
}
return n.join('-') == this.path;
},
// togPath(...n) { this.setPath(...this.isPath(...n) ? n.slice(0,-1) : n); },
removeMenuPath: function removeMenuPath() {
this.menuPathDesktop.splice(0);
},
restoreMenuPath: function restoreMenuPath() {
this.menuPathDesktop = [].concat(this.menuPath);
},
storeSelectedHeight: function restoreSelecteHeight(height) {
var sEl = document.getElementsByClassName("selected");
this.selectedLevelsTemp = [];
for(var i=0; i < sEl.length; i++){
this.selectedLevelsTemp = this.selectedLevelsTemp.concat(sEl[i]);
}
this.selectedHeightTemp = height;
},
setFocPath: function setFocPath() {
for (var _len8 = arguments.length, n = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
n[_key8] = arguments[_key8];
}
if($(".main-heading.active").length){
$(".main-heading.active").addClass("inactive").removeClass("active");
}
this.focPath = n.join('-');
},
hasFocPath: function hasFocPath() {
for (var _len9 = arguments.length, n = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
n[_key9] = arguments[_key9];
}
return new RegExp("^".concat(n.join('-'))).test(this.focPath);
},
isFocPath: function isFocPath() {
for (var _len10 = arguments.length, n = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
n[_key10] = arguments[_key10];
}
return n.join('-') == this.focPath;
},
isSelected: function isSelected(children) {
var sel = 1;
for(var i =0; i < children.length; i++){
if(this.menuPathDesktop.indexOf(children[i].uid) > -1){
sel = 0;
}
}
return sel;
},
// toggle areas
toggleFastArea: function toggleFastArea() {
var _this3 = this;
if (this.fastIsOpen) {
gsap.to(this.$refs.liner, 0.25, {
y: 0,
onComplete: function onComplete() {
return _this3.fastIsOpen = !_this3.fastIsOpen;
}
});
this.setFocus(this.itemRef('meta', 0));
} else {
this.onEsc();
this.fastIsOpen = !this.fastIsOpen;
this.$nextTick(function () {
var shiftHeight = _this3.$refs.fastArea.getBoundingClientRect().height;
gsap.to(_this3.$refs.liner, 0.25, {
y: shiftHeight
});
_this3.setFocus('fastClose');
});
}
},
toggleSearchArea: function toggleSearchArea() {
var _this4 = this;
if (this.searchIsOpen) {
gsap.to(this.$refs.liner, 0.25, {
y: 0,
onComplete: function onComplete() {
return _this4.searchIsOpen = !_this4.searchIsOpen;
}
});
this.setFocus(this.itemRef('meta', 3));
} else {
this.onEsc();
this.searchIsOpen = !this.searchIsOpen;
this.$nextTick(function () {
var shiftHeight = _this4.$refs.searchArea.getBoundingClientRect().height;
gsap.to(_this4.$refs.liner, 0.25, {
y: shiftHeight
});
_this4.setFocus('searchInput');
});
}
}
},
created(){
this.$root.$on('esc', this.onEsc);
this.$root.$on('modalOpen', (e) => this.modalIsOpen = true);
this.$root.$on('modalClose', (e) => this.modalIsOpen = false);
},
mounted(){
var _this5 = this;
var headroom = new Headroom(this.$el, headroomOptions);
headroom.init();
this.scrollbarWidth = _getScrollbarWidth();
this.$on('modalClose', function () {
return _this5.modalIsOpen = false;
});
},
watch: {
path: function path() {
var _this6 = this;
if (this.path.length) {
this.$root.$emit('setOverlay');
$("#menu-collapse").removeClass("d-none");
var panelMenus = this.path.split('-').reduceRight(function (out, val, i, arr) {
out.push(arr.slice(0, i + 1).join('-'));
return out;
}, []).map(function (ref) {
return _this6.getRef("panel-menu-".concat(ref));
}).reverse();
this.$nextTick(function () {
var selectedHeights = [];
var setHeight = 'auto';
var isRestoredPath = false;
if(this.path.length == 1){
var mainHeadings = document.getElementsByClassName("main-heading");
var name = "";
for (var i = 0; i < mainHeadings.length; i++) {
if(mainHeadings[i].childNodes[0].className == "onpath"){
name = mainHeadings[i].firstChild.childNodes[0].nodeValue;
name = name.toLowerCase().trim().replace(" ", "_").replace("ä","ae").replace("ö", "oe").replace("ü", "ue").replace("ß", "ss");
break;
}
}
if(name == this.menuPath[0]){
this.restoreMenuPath();
isRestoredPath = true;
}
}
var selectedLevels = document.getElementsByClassName("selected");
if (selectedLevels.length > 1){
for (var i = 0; i < selectedLevels.length; i++) {
if(selectedLevels[i].parentNode.parentNode.getBoundingClientRect().height > 0){
selectedHeights.push(selectedLevels[i].parentNode.parentNode.getBoundingClientRect().height);
}
}
if (selectedHeights.length > 0){
setHeight = "".concat(Math.max.apply(Math, selectedHeights), "px");
for (var i = 0; i < selectedLevels.length; i++) {
var myParentElement = selectedLevels[i].parentElement.parentElement.nodeName;
if(myParentElement ==="UL"){
selectedLevels[i].parentNode.parentNode.style.height = setHeight;
}
}
this.storeSelectedHeight(setHeight);
}
}else{
if(this.selectedLevelsTemp.length > 1 && isRestoredPath){
setHeight = this.selectedHeightTemp;
for (var i = 0; i < this.selectedLevelsTemp.length; i++) {
var myParentElement = this.selectedLevelsTemp[i].parentElement.parentElement.nodeName;
if(myParentElement ==="UL"){
this.selectedLevelsTemp[i].parentNode.parentNode.style.height = this.selectedHeightTemp;
}
}
}
}
panelMenus.forEach(function (panelMenu) {
panelMenu.style.height = setHeight;
});
if (panelMenus.length > 1) {
var heights = panelMenus.map(function (menu) {
return menu.getBoundingClientRect().height;
});
panelMenus.forEach(function (panelMenu) {
panelMenu.style.height = "".concat(Math.max.apply(Math, _toConsumableArray(heights)), "px");
});
}
});
} else {
this.$root.$emit('removeOverlay');
$("#menu-collapse").addClass("d-none");
$(".main-heading.inactive").removeClass("inactive").addClass("active");
}
}
}
};
// Page Header
const pageHeader = {
data: function(){
return{
overlay: false
}
},
methods: {
overlayClick() {
// console.log('overlay was clicked');
this.$root.$emit('esc');
}
},
created() {
this.$root.$on('setOverlay', (e) => this.overlay = true);
this.$root.$on('removeOverlay', (e) => this.overlay = false);
}
};
function uid() {
// https://gist.github.com/gordonbrander/2230317
// Math.random should be unique because of its seeding algorithm. Convert it to base 36 (numbers + letters), and grab the first 9 characters after the decimal.
return '_' + Math.random().toString(36).substr(2, 9);
}
headroomOptions.offset = 150;
const phabletFastItem = {
template: '#phablet-fast-item',
props: {
themeKey: String,
active: {
type: Boolean,
default: false
}
},
data: function data() {
return {
isOpen: false,
sourceID: uid(),
targetID: uid()
};
},
methods: {
toggle: function toggle() {
this.isOpen = !this.isOpen;
},
enter: function enter(el, done) {
gsap.set(el, {
height: 'auto'
});
gsap.from(el, 0.2, {
height: 0,
onComplete: done
});
},
leave: function leave(el, done) {
gsap.to(el, 0.2, {
height: 0,
onComplete: done
});
},
afterEnter: function afterEnter(el) {
gsap.to(this.$refs.target, 0.2, {
autoAlpha: 1
});
},
beforeLeave: function beforeLeave(el) {
gsap.to(this.$refs.target, 0.2, {
autoAlpha: 0
});
}
},
computed: {
bgClass: function bgClass(key) {
return this.isOpen ? "bg-".concat(this.themeKey) : 'bg-gr4';
},
textClass: function textClass(key) {
return this.isOpen ? "text-white" : "text-".concat(this.themeKey);
}
},
mounted: function mounted() {
gsap.set(this.$refs.target, {
autoAlpha: 0
});
},
watch: {
active: function active(newVal, oldVal) {
this.isOpen = newVal;
}
}
};
//
// PHABLET MENU
//
const phabletMenu = {
props: ['sitemap', 'fastBlocks', 'menuPath'],
components: {
'phablet-fast-item': phabletFastItem
},
data: function(){
return{
activeFastItem: '',
scrollbarWidth: 0,
path: '',
level: level,
initialOpening: true,
menuOpen: false,
loginOpen: false,
fastMenuOpen: false,
intPath: '',
refPath: '',
refRect: null
}
},
mounted: function mounted() {
var _this2 = this;
var classes = headroomOptions.classes;
var headroom = new Headroom(this.$el, {
offset: 260,
classes: classes
});
headroom.init();
this.scrollbarWidth = _getScrollbarWidth();
},
methods: {
toggleMenu: function toggleMenu(level) {
this.menuOpen = !this.menuOpen;
if(!this.menuOpen) {
this.initialOpening = false;
}
},
toggleFastMenu: function toggleFastMenu() {
this.fastMenuOpen = !this.fastMenuOpen;
if (!this.fastMenuOpen) {
this.activeFastItem = '';
}
},
validLevel: function validLevel(level) {
return level && level.children;
},
genPath: function genPath() {
for (var _len = arguments.length, segments = new Array(_len), _key = 0; _key < _len; _key++) {
segments[_key] = arguments[_key];
}
return segments.join('-');
},
setPath: function setPath() {
var _this = this;
var newPath = this.genPath.apply(this, arguments);
var dir = this.path.length > newPath.length ? 'dn' : 'up';
this.level = arguments.length;
this.intPath = newPath;
if (dir == 'up'){
this.path = newPath; // NB this is the transition set in the CSS
}
else{
setTimeout(function () {
_this.path = newPath;
}, 300);
}
},
hasPath: function hasPath() {
for (var _len2 = arguments.length, segments = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
segments[_key2] = arguments[_key2];
}
return new RegExp("^".concat(segments.join('-'))).test(this.path);
},
isPath: function isPath() {
for (var _len3 = arguments.length, segments = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
segments[_key3] = arguments[_key3];
}
return segments.join('-') == this.path;
}
},
watch: {
menuOpen: {
immediate: true,
handler: function handler(isOpen) {
if (isOpen) document.body.setAttribute('style', "overflow: hidden; padding-right: ".concat(this.scrollbarWidth));else document.body.removeAttribute('style');
}
},
intPath: {
immediate: false,
handler: function handler() {
var _this3 = this;
var oldRef = this.$refs[this.refPath];
var newRef = this.$refs[this.intPath];
var oldRect = oldRef ? oldRef[0].getBoundingClientRect() : this.$refs['top'].getBoundingClientRect();
this.$nextTick(function () {
var newRect = newRef ? newRef[0].getBoundingClientRect() : _this3.$refs['top'].getBoundingClientRect();
if (!_this3.menuOpen) {
_this3.$refs['mainPusher'].style.height = 'auto';
} else if (oldRect.height > newRect.height) {
setTimeout(function () {
_this3.$refs['mainPusher'].style.height = "".concat(newRect.height, "px");
}, 300);
} else {
_this3.$refs['mainPusher'].style.height = "".concat(newRect.height, "px");
}
});
this.refPath = this.intPath;
}
}
},
computed: {
fastPusherStyle: function fastPusherStyle() {
return {
transform: "translate3d(".concat(this.fastMenuOpen ? '-50%' : '0%', ",0,0)")
};
},
mainPusherStyle: function mainPusherStyle() {
return {
transform: "translate3d(-".concat(this.level * 100, "%,0,0)")
};
},
modalOpenStyle: function modalOpenStyle() {
return {
paddingRight: this.menuOpen ? "".concat(this.scrollbarWidth, "px") : '0px'
};
}
}
};
const cookieModal = {
data: function data() {
return {
acceptedCookies: ['essential']
}
},
methods: {
// save accepted cookies
acceptCookies: function acceptCookies(acceptAll){
var acceptedCookies;
if(acceptAll){
acceptedCookies = "*";
}
else{
acceptedCookies = this.acceptedCookies;
}
Cookies.set(
'cookie-consent',
acceptedCookies,
{
expires:30,
domain:'.tu-darmstadt.de',
path:'/',
sameSite:'lax',
secure:true
}
);
$('#cookie-modal').modal('hide');
}
},
mounted() {
this.$on('esc', this.onEsc);
if(!Cookies.get('cookie-consent')){
$('#cookie-modal').modal('show');
}
else{
$('#cookie-modal').modal('dispose');
}
}
};
var appVm = new Vue({ //Vue-Root
el: "#app",
components: {
'desktop-menu': desktopMenu,
'page-header': pageHeader,
'phablet-menu': phabletMenu,
'cookie-modal': cookieModal
},
data() {
return {
sitemap: [],
fastBlocks: [],
menuPath: menuPath
}
},
beforeCreate: function() {
fetch(sitemapUrl).then(response => {
if (response.ok){
return response.json();
} else{
throw new Error('sitemap couldn\'t be loaded');
}
})
.then(json => {
this.sitemap = json;
});
fetch(fastBlocksUrl).then(response => {
if (response.ok){
return response.json();
} else{
throw new Error('fastBlocks couldn\'t be loaded');
}
})
.then(json => {
this.fastBlocks = json;
});
},
});
$(document).on('hidden.bs.modal', () => appVm.$emit('modalClose'));
$(document).on('shown.bs.modal', () => appVm.$emit('modalOpen'));