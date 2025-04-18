import {detectBrowser, isMobile, showPreloader} from "./utils/_helpers";
import {burger} from "./ui/_burger";
import {accordion} from "./ui/_accardion";
import {numberInput} from "./forms/_number-input";
import {showPassword} from "./forms/_show-password";
import {fancyboxInit, showNotices} from "../plugins/_fancybox-init";
import {selectrickInit} from "../plugins/_selectric-init";
import FormHandler from "./forms/FormHandler";
import Slick from "../plugins/Slick";
import {makeActiveStars} from "./forms/_rating-inputs";
import {toggler} from "./ui/_togglers";
import {tabs} from "./ui/_tabs";
import {headerFormInit} from "./forms/_header-form";

export default class Application {
    constructor() {
        this.$doc = $(document);
        this.$body = $("body");
        this.parser = new DOMParser();
        this.init();
    }

    init() {
        this.initBrowserAttributes();
        this.initComponents();
    }

    showLoaderOnClick() {
        this.$doc.on('click', 'a.show-load, .header a, .footer a', function (e) {
            if (!$(this).attr('href').includes('#')) showPreloader();
        });
    }

    initBrowserAttributes() {
        const browserName = detectBrowser();
        this.$body.attr("data-browser", browserName).addClass(browserName);

        if (isMobile) {
            this.$body.attr("data-mobile", "mobile");
        }
    }

    initComponents() {
        this.$doc.ready(() => {
            showNotices();
            burger();
            toggler();
            accordion();
            numberInput();
            showPassword();
            selectrickInit();
            fancyboxInit();
            makeActiveStars();
            tabs();
            headerFormInit();
            this.showLoaderOnClick();
            this.linkListener();
            const form = new FormHandler('.form-js');
            const slick = new Slick();
        });
    }


    linkListener() {
        const t = this;
        this.$doc.on('click', 'a[href*="#"]:not(.fancybox, .tab-head)', function (e) {
            e.preventDefault();
            const $t = $(this);
            const href = $t.attr('href');
            if (href === '#') return;
            const hashValue = href.split('#')[1];
            if (hashValue !== undefined) {
                const $el = t.$doc.find('#' + hashValue);
                if ($el.length > 0) {
                    if ($t.hasClass('not-scroll')) return;
                    $('html, body').animate({
                        scrollTop: $el.offset().top
                    });
                    return;
                }
            }
            window.location.href = href;
        });
        this.$doc.on('click', '[data-link]', function (e) {
            e.preventDefault();
            const $t = $(this);
            const href = $t.attr('data-link');
            if (href === '#') return;
            const hashValue = href.split('#')[1];
            if (hashValue !== undefined) {
                const $el = t.$doc.find('#' + hashValue);
                if ($el.length > 0) {
                    $('html, body').animate({
                        scrollTop: $el.offset().top
                    });
                    return;
                }
            }
            window.location.href = href;
        });
    }
}