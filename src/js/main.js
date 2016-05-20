import './lib/sorttable'

import mainTemplate from './template/main.html!text'
import Table from './components/table'
import Animation from './components/animation'
import ShareButtons from './components/sharebuttons'
import CourseSearch from './components/coursesearch'
import { set as setConfig } from './lib/cfg'
import subjectNames from './data/subjectNames.json!json' //contains init data
import doT from 'olado/doT'
import { lowercase as lowercaseSubjectName } from './lib/subjectNames'

var mainTemplateFn = doT.template(mainTemplate);

function init(el, config) {
    console.log(config)
    setConfig(config);
    config.credit = "illustration: Adam Avery"
    el.innerHTML = mainTemplateFn({
        headline: config.headline,
        credit: config.credit,
        subject: lowercaseSubjectName(config.subjectId)
    });

    var courseSearchComponent = new CourseSearch({
        el: el.querySelector('#ug16__search-container')
    });

    var animationComponent = new Animation({
        el: el.querySelector('.ug16__animation-container')
    });

    var shareButtonsComponent = new ShareButtons({
        el: el.querySelector('.ug16__share-buttons'),
        shortUrl: config.shortUrl,
        headline: config.headline
    });

    var changeHash = id => { if (window.location.hash || id !== 'all') window.location.hash = '#' + id };
    var noop = () => null;

    var tableComponent = new Table({
        el: el.querySelector('#ug16 .ug16__table-container'),
        subjectChange: config.subjectId ? noop : changeHash
    });

    function showTable() {
        tableComponent.set(config.subjectId || window.location.hash.substring(1) || 'all');
    }
    window.addEventListener('hashchange', showTable);
    showTable();

    if (window.guardian) {
        document.querySelector('.l-footer').style.display = 'block';
    }
}

export default {init: init};
