module Jekyll
    class PlantUmlBlock < Liquid::Block

        def initialize(tag_name, markup, tokens)
            super
            @markup = markup;
        end

        def render(context)
            require 'base64'
            output = super(context);
            output = output.force_encoding("utf-8");
            enc = Base64.encode64(output);
            %{<img uml="#{enc}" />}
        end

    end
end

Liquid::Template.register_tag('uml', Jekyll::PlantUmlBlock)
