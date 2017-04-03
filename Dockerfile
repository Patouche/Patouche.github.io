FROM jekyll/jekyll:pages

LABEL maintainer "Patrick Allain"



CMD ["/usr/local/bin/jekyll", "serve", "--watch"]
