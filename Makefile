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

.PHONY: build-all
NODE_VERSION := 18.15
FUNCTION_DIRS := $(wildcard ./functions/*/)
build-all:
	@echo "--- Starting Build Process ---"
	@for function_dir in $(FUNCTION_DIRS); do \
			function=$$(basename $$function_dir); \
			echo "--- Start Building $$function Function ---"; \
			if [ -d "$$function_dir" ]; then \
					echo "[1]: Building $$function..."; \
					npm --prefix $$function_dir ci; \
					npm --prefix $$function_dir run build; \
					echo "[2]: Creating bootstrap file for $$function"; \
					echo "/opt/function/runtime/nodejs$(NODE_VERSION)/rtsp/nodejs/bin/node \$$RUNTIME_CODE_ROOT/dist/functions/$$function/src/index.js" > $$function_dir/bootstrap; \
					echo "[3]: Zipping files for $$function"; \
					mkdir -p ./out; \
					cd $$function_dir && zip -r ../../out/$$function.zip ./dist ./node_modules ./package.json ./package-lock.json ./bootstrap && cd -; \
					echo "--- Done Building $$function ---"; \
			else \
					echo "Error: Folder $$function_dir does not exist"; \
			fi \
	done
	@echo "--- Build Process Completed ---"

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
	@cd $(FUNCTION_PATH) && npm pkg set 'scripts.start'='node dist/functions/$(function)/src/index.js'
	@cd $(FUNCTION_PATH) && npm pkg set 'scripts.dev'='nodemon'
	@echo "[2]: Install package..."
	@cd $(FUNCTION_PATH) && npm i express
	@cd $(FUNCTION_PATH) && npm i -D @types/express
	@cd $(FUNCTION_PATH) && npm i dotenv
	@cd $(FUNCTION_PATH) && npm i cors
	@cd $(FUNCTION_PATH) && npm i -D @types/cors
	@cd $(FUNCTION_PATH) && npm i express-validator
	@echo "[3]: Clone template files..."
	@cp -r ./functions/templates/src $(FUNCTION_PATH)
	@cp -r ./functions/templates/nodemon.json $(FUNCTION_PATH)
	@cp -r ./functions/templates/tsconfig.json $(FUNCTION_PATH)
	@cp -r ./functions/templates/Dockerfile $(FUNCTION_PATH)

	@echo "PORT=8000" > $(FUNCTION_PATH)/.env
	@echo "/opt/function/runtime/nodejs18.15/rtsp/nodejs/bin/node $RUNTIME_CODE_ROOT/dist/functions/$(function)/src/index.js" > $(FUNCTION_PATH)/bootstrap

	@cd $(FUNCTION_PATH)src/ && sed 's/templates/$(function)/' index.ts > index.new.ts
	@cd $(FUNCTION_PATH)src/ && mv index.ts index.old.ts
	@cd $(FUNCTION_PATH)src/ && mv index.new.ts index.ts
	@cd $(FUNCTION_PATH)src/ && rm index.old.ts

	@cd $(FUNCTION_PATH) && sed 's/templates/$(function)/g' Dockerfile > Dockerfile.new
	@cd $(FUNCTION_PATH) && mv Dockerfile Dockerfile.old
	@cd $(FUNCTION_PATH) && mv Dockerfile.new Dockerfile
	@cd $(FUNCTION_PATH) && rm Dockerfile.old
	@echo "--- Done ---"
	@echo "--- Please add this to index.ts in root for easy to test in local environment ---"
	@echo 'import import $(function)Router from "./functions/$(function)/src/routes";'
	@echo 'app.use("/$(function)", $(function)Router);'
	@echo "--- End ---"
else
init:
	@echo "Error: $(function) function already exist"
endif
else
init:
	@echo "Error: please declare your function name"
endif