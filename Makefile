.PHONY: build
AVIABLE_FUNCTIONS := $(shell if [ -d "functions/$(function)" ]; then echo true; else echo false; fi)
FUNCTION_PATH := ./functions/$(function)/
NODE_VERSION := 18.15
ifdef function
ifeq ($(AVIABLE_FUNCTIONS), true)
build:
	@echo "[1]: Building..."
	npm --prefix $(FUNCTION_PATH) run build
	@echo "[2]: Create bootstrap file"
	@echo "/opt/function/runtime/nodejs$(NODE_VERSION)/rtsp/nodejs/bin/node \$$RUNTIME_CODE_ROOT/dist/functions/$(function)/src/index.js" > $(FUNCTION_PATH)/bootstrap
	@echo "[3]: Zip files"
	mkdir -p ./out
	cd $(FUNCTION_PATH) && zip -r ../../out/$(function).zip ./dist ./node_modules ./package.json ./package-lock.json ./bootstrap && cd -
else
build:
	@echo "Error: folder does not exist"
endif
else
build:
	@echo "Error: please declare your function name"
endif
