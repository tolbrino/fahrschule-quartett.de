.POSIX:

all: help

.PHONY: bundler
bundler: ## install Ruby dependencies with bundler
	bundler install

.PHONY: install
install: bundler ## install all dependencies

.PHONY: build
build: ## build site with jekyll
	bundle exec jekyll build

.PHONY: serve
build: ## serve site with jekyll
	bundle exec jekyll serve

.PHONY: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' Makefile | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
