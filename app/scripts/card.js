'use strict';

import $ from 'jquery';

$('.js-card-queue-toggle').click(function (e) {

  e.preventDefault();

  $(this).closest('.js-card-queue').toggleClass('mdl-card--expanded');
});
