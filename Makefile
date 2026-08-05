# Makefile for Math Worksheet Generator (Debian / Linux)

.PHONY: help setup desktop install-desktop dev start run build preview lint clean

help:
	@echo "Math Worksheet Generator - Debian / Linux Commands:"
	@echo "  make setup           - Install Debian system dependencies & npm packages"
	@echo "  make install-desktop - Create desktop application shortcut for Debian desktop"
	@echo "  make dev             - Run development server (opens browser via run.sh)"
	@echo "  make build           - Build production web app distribution"
	@echo "  make preview         - Preview production build locally"
	@echo "  make lint            - Run code linter"
	@echo "  make clean           - Clean build output and node_modules"

setup:
	@bash ./setup-debian.sh

desktop install-desktop:
	@bash ./install-desktop.sh

dev run start:
	@bash ./run.sh

build:
	@npm run build

preview:
	@npm run preview

lint:
	@npm run lint

clean:
	@rm -rf dist node_modules

