module Jekyll
    class ShinyBootstrapBlock < Liquid::Block

        def initialize(tag_name, markup, tokens)
            super
            @type = markup
        end

        def render(context)
            output = super(context);
            %{<div class="alert alert-#{@type}" role="alert">#{output}</div>}
        end
    end
end

Liquid::Template.register_tag('shiny', Jekyll::ShinyBootstrapBlock)
