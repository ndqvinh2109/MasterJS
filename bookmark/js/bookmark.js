(function() {

    $.fn.bookmark = function(options) {

        var defaults = {
            bookmarks: {},
            classIcon: {
                editIcon: 'glyphicon glyphicon-edit',
                deleteIcon: 'glyphicon glyphicon-remove'
            }
        };

        var settings = $.extend({}, defaults, options);

        return this.each(function(index, element) {
            var base = element,
                $base = $(element);

            base.buildCard = function(bookmark) {
                var wrapper = '<div></div>',
                    mainElement = '<main></main>',
                    sectionElement = "<section></section>",
                    mapElement = '<div></div>',
                    h2Element = "<h2></h2>",
                    h1Element = "<h1></h1>",
                    spanElement = '<span></span>';

                $base.addClass('container').append(
                    $(wrapper).addClass('col-sm-3')
                    .append($(mainElement)
                        .append($(sectionElement).attr('data-cardid', bookmark.id).addClass('card')
                            .append($(spanElement).addClass(settings.classIcon.deleteIcon).addClass('pull-right'))
                            .append($(spanElement).addClass(settings.classIcon.editIcon).addClass('pull-right').css({
                                'margin-right': '10px'
                            })).append($(h1Element).text(bookmark.title))
                            .append($(h2Element).text(bookmark.link).css({'display': 'none' }))
                            .append($(mapElement).addClass('map').text(bookmark.link))))
                );
            }

            base.init = function() {
                for (var bookmark in settings.bookmarks) {
                    base.buildCard(settings.bookmarks[bookmark]);
                }
            }

            base.init();


            $base.on('click', $base.find('section'), function(e) {

                var $target = $(e.target),
                    cardid = $target.closest('section').data('cardid');
                console.log(e.target);
                if ($target.hasClass(settings.classIcon.deleteIcon)) {

                    $.ajax({
                        url: 'http://localhost:8080/api/bookmarks/' + cardid,
                        type: 'DELETE',
                        success: function(data) {
                            if (data) {
                                $base.html('')
                                $.ajax({
                                    url: 'http://localhost:8080/api/bookmarks',
                                    type: 'GET',
                                    success: function(data) {
                                        if (data) {
                                            for (var item in data) {
                                                base.buildCard(data[item]);
                                            }
                                        }
                                    }
                                });

                            }
                        }
                    });

                } else if ($target.hasClass(settings.classIcon.editIcon)) {
                    $.ajax({
                        url: 'http://localhost:8080/api/bookmarks/' + cardid,
                        type: 'GET',
                        success: function(data) {
                            if (data) {
                                $('#title1').val(data.title);
                                $('#link1').val(data.link);
                                $('#editBookmark').data('updated-cardid', data.id).modal();
                            }
                        }
                    });

                } else if (!$target.hasClass($base.attr('class')) &&
                    !$target.is('main') &&
                    !$target.is('div.col-sm-3')) {

                    window.open($target.closest('section').find('h2').text(), '_blank');
                }

            });

            $('#saveBtn').on('click', function() {
                $.ajax({
                    url: 'http://localhost:8080/api/bookmarks',
                    type: 'POST',
                    data: {
                        title: $('#title').val(),
                        link: $('#link').val()
                    },
                    success: function(data) {
                        if (data) {
                            base.buildCard(data.returnedObject);
                            $('#title').val('');
                            $('#link').val('');
                        }
                    }
                });
            });

            $('#updateBtn').on('click', function() {
                var updatedCardId = $('#editBookmark').data('updated-cardid');
                $.ajax({
                    url: 'http://localhost:8080/api/bookmarks/' + updatedCardId,
                    type: 'PUT',
                    data: {
                        title: $('#title1').val(),
                        link: $('#link1').val()
                    },
                    success: function(data) {
                        if (data) {
                            $('[data-cardId=' + updatedCardId + ']').find('h1').text(data.title).end().find('h2').text(data.link);
                            $('#editBookmark').modal('hide');
                        }
                    }
                });
            });


        });
    };
})();

$(document).ready(function() {
    $.ajax({
        url: 'http://localhost:8080/api/bookmarks',
        type: 'GET',
        success: function(data) {
            $('.bookmarkWrapper').bookmark({
                bookmarks: data
            });

        }
    });

    $('#search').on('keypress', function(e) {
        console.log(e.target);
    });

});
