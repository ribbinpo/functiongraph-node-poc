.PHONY: build
AVIABLE_FUNCTIONS := $(shell if [ -d "functions/$(function)" ]; then echo true; else echo false; fi)
FUNCTION_PATH := ./functions/$(function)/
NODE_VERSION := 18.15
ifdef function
ifeq ($(AVIABLE_FUNCTIONS), true)
build:
	@echo "--- Strat Build $(function) Function ---"
	@echo "[1]: Building..."
	npm --prefix $(FUNCTION_PATH) ci
	npm --prefix $(FUNCTION_PATH) run build
	@echo "[2]: Create bootstrap file"
	@echo "/opt/function/runtime/nodejs$(NODE_VERSION)/rtsp/nodejs/bin/node \$$RUNTIME_CODE_ROOT/dist/functions/$(function)/src/index.js" > $(FUNCTION_PATH)/bootstrap
	@echo "[3]: Zip files"
	mkdir -p ./out
	cd $(FUNCTION_PATH) && zip -r ../../out/$(function).zip ./dist ./node_modules ./package.json ./package-lock.json ./bootstrap && cd -
	@echo "--- Done ---"
else
build:
	@echo "Error: folder does not exist"
endif
else
build:
	@echo "Error: please declare your function name"
endif

.PHONY: init
ALREADY_EXIST := $(shell if [ -d "functions/$(function)" ]; then echo true; else echo false; fi)
FUNCTION_PATH := ./functions/$(function)/
ifdef function
ifeq ($(ALREADY_EXIST), false)
init:
	@echo "--- Initialize function $(function) ---"
	@mkdir -p $(FUNCTION_PATH)
	@echo "[1]: Setup npm scripts..."
	@cd $(FUNCTION_PATH) && npm init -y
	@cd $(FUNCTION_PATH) && npm pkg set 'scripts.build'='npx tsc'
	@cd $(FUNCTION_PATH) && npm pkg set 'scripts.start'='node dist/functions/users/src/index.js'
	@cd $(FUNCTION_PATH) && npm pkg set 'scripts.dev'='nodemon'
	@echo "[2]: Install package..."
	@cd $(FUNCTION_PATH) && npm i express
	@cd $(FUNCTION_PATH) && npm i -D @types/express
	@cd $(FUNCTION_PATH) && npm i dotenv
	@echo "[3]: Clone template files..."
	@cp -r ./functions/templates/src/* $(FUNCTION_PATH)
	@cp -r ./functions/templates/nodemon.json $(FUNCTION_PATH)
	@cp -r ./functions/templates/tsconfig.json $(FUNCTION_PATH)
	@echo "PORT=8000" > $(FUNCTION_PATH)/.env
	@echo "--- Done ---"
else
init:
	@echo "Error: $(function) function already exist"
endif
else
init:
	@echo "Error: please declare your function name"
endif
