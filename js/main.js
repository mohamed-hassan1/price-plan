(function() {
  let planContainer = $('#pricing_crm');
  if (planContainer[0]) {
    let switchPlanBtn = planContainer.find('.switch-plan button'),
        pricesPlan = planContainer.find('.price .num'),
        planBoxes = planContainer.find('.plan-boxes'),
        monthPrices = [],
        yearPrices = [];
    // Store month/year prices
    pricesPlan.each(function() {
      if ($(this).closest('.box-plan')[0] !== planBoxes.children()[0]) {
        monthPrices.push(Number($(this).text()));
        yearPrices.push(Number($(this).attr('data-ann')));
      }
    });

    // Plan Switcher button Monthly/Yearly
    switchPlanBtn.on('click', function() {
      
      if ($(this).hasClass('btn-month') && $(this).parent().hasClass('active')) {
        // Monthly button
        $(this).parent().removeClass('active');
        // Prices
        for (let i = 0; i < monthPrices.length; i++) {
          planContainer.find('.box-plan:nth-child(' + (i + 2) + ') .num').text(monthPrices[i]);
          planContainer.find('.box-plan:nth-child(' + (i + 2) + ') .note-price').text('');
        }
      } else if ($(this).hasClass('btn-year') && !$(this).parent().hasClass('active')) {
        // Yearly button
        $(this).parent().addClass('active');
        // Prices
        for (let i = 0; i < yearPrices.length; i++) {
          planContainer.find('.box-plan:nth-child(' + (i + 2) + ') .num').text(yearPrices[i] * 12);
          planContainer.find('.box-plan:nth-child(' + (i + 2) + ') .note-price').text('$' + yearPrices[i]);
        }
      }
    });

    let planBoxContainer = planContainer.find('.plan-boxes'),
        planTable = planContainer.find('.plan-table'),
        rowTitle = planContainer.find('.row-title');
    if ($(window).width() > 767) {
      // Wrap Table row
      for (let i = 0; i < rowTitle.length; i++) {
        let div = document.createElement('div');
        div.className = 'desktop-row-container';
        planTable[0].insertBefore(div, rowTitle[i].nextElementSibling);
      }
      let desktopRowContainer = planTable.find('.desktop-row-container');
      for (let b = 0; b < desktopRowContainer.length; b++) {
        while ($(desktopRowContainer[b]).next().hasClass('row-table')) {
          $(desktopRowContainer[b]).append($(desktopRowContainer[b]).next());
        }
      }
    } else {
      tableResponsive();
    }
    // Show/Hide Features
    rowTitle = planContainer.find('.row-title');
    rowTitle.on('click', function() {
      $(this).toggleClass('active');
      $(this).next().slideToggle('fast');
    });
    if ($(window).width() > 767) {
      $(rowTitle[0]).click();
    }
    // Show/Hide details
    let mainTitle = planContainer.find('.main-title');
    mainTitle.on('click', function() {
      $(this).toggleClass('active');
      $(this).next().slideToggle('fast');
    }); 

    // Table Mobile Screen
    function tableResponsive() {
      if ($(window).width() <= 767) {
        let mobTable, mobRow;
        for (let i = 0; i < planBoxContainer.children().length; i++) {
          let num = 0, num2 = 0;
              planBox = $(planBoxContainer.children()[i]);
          for (let a = 0; a < planTable.children().length; a++) {
            let innerBox = planBox.find('.inner-box'),
                tableChildes = $(planTable.children()[a]);
            if (!innerBox.find('.mob-table')[0]) {
              innerBox.append('<div class="mob-table"></div>');
              mobTable = innerBox.find('.mob-table');
            }
            if (tableChildes.hasClass('row-title')) {
              tableChildes.clone().appendTo(mobTable);
            } else if (tableChildes.hasClass('row-table')) {
              if (tableChildes.prev()[0] && tableChildes.prev().hasClass('row-title')) {
                mobTable.append('<div class="mob-row-container"></div>');
                num++;
              }
              mobTable.append('<div class="mob-row"></div>');
              mobRow = mobTable.children()[a + num];
              tableChildes.find('.tab-info').clone().appendTo(mobRow);
              $(tableChildes.children()[1 + i]).clone().appendTo(mobRow);
            }
          }
          let mobRowContainer = planBox.find('.mob-row-container');
          for (let b = 0; b < mobRowContainer.length; b++) {
            while ($(mobRowContainer[b]).next().hasClass('mob-row')) {
              $(mobRowContainer[b]).append($(mobRowContainer[b]).next());
            }
          }
        }
      }
    }
  }
}());