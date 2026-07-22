.PHONY: install generate lint-proto build typecheck test pr clean help

install:
	npm install

generate:
	npm run generate

lint-proto:
	npm run lint:proto

build:
	npm run build

typecheck:
	npm run typecheck

test:
	npm test

pr:
	npm run pr

clean:
	npm run clean

help:
	@echo "Available targets:"
	@echo "  make install    - Install npm dependencies"
	@echo "  make generate   - Prepare Cadence IDL and generate TypeScript protobuf files"
	@echo "  make lint-proto - Lint the Cadence protobuf definitions"
	@echo "  make build      - Compile the library"
	@echo "  make typecheck  - Type-check source and tests"
	@echo "  make test       - Run unit tests"
	@echo "  make pr         - Run generate, lint-proto, typecheck, build, and test"
	@echo "  make clean      - Remove build and test artifacts"
