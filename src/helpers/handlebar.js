const v = require('voca')

module.exports = {
    stripTags: function(html, allowableTags=null, replacement=null){
        return v.stripTags(html, allowableTags, replacement);
    },
    paginate: function(pagination){
        if (pagination.pages.length > 1) {
            var html = '<ul class="pagination">';
            pagination.pages.forEach(element => {
                var active = pagination.currentPage === element.number ? 'active' : ''
                html += `<li class="${active}"><a href="${element.url}">${element.number}</a></li>`
            });
            html += '</ul>';

            return html;
        }

        return;
    },
    productImage: function(img) {
        return '/static/images/product/' + img;
    }
}