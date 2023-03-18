#! bin/sh
# -*- coding: utf-8 -*-
# vim: set ft=sh et ts=4 sw=4 sts=4:
# =================================================================================================
#
# Copyright 2022 Serhat Teker <me@serhatteker.com>
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
#
# File                  : ve
# Descrtiption          : Toggle theme mode on Ubuntu 20.04 LTS and MacOS Monterey 12.3
# Author                : Serhat Teker <me@serhatteker.com>
# Date                  : 2022-05-10T18:58:06+0300 | 1652198286
# Last Modified Date    : 2022-05-10T18:58:06+0300 | 1652198286
# Notes                 : Check wheter virtual environment exists in current working directory. If not, create and activate one. If already in a virtual environment warn about it.
# Usage                 :
#
# Make it executable and put it in your $PATH. Or put it in your zsh/bash/fish functions.
# $ chmod +x ./ve && mv ./ve $HOME/.local/bin
#
# How to run:
# Without arguments it will create virtualenv named `.env` with `python3.8` version
# $ ve
# or for a specific python version
# $ ve python3.9
# or for a specific python version and environment name;
# $ ve python3.9 ./.venv-diff
#
# For detailed tutorial look at the post:
# https://tech.serhatteker.com/post/2022-04/automate-python-virtualenv
# =================================================================================================

# Bash safeties: exit on error, no unset variables, pipelines can't hide errors
set -o errexit
# set -o nounset
# set -o pipefail


# Logical conditions:
# 0. If not already in virtualenv:
# 0.1. If virtualenv already exists activate it,
# 0.2. If not create it with global packages, update pip then activate it
# 1. If already in virtualenv: just give info
ve() {
    local py=${1:-python3}    # default python version is python3
    local env="${2:-./backend/env}"  # default virtual environment name is env

    local bin="${env}/bin/activate"

    # If not already in virtualenv
    # $VIRTUAL_ENV is being set from $env/bin/activate script
    if [ -z "${VIRTUAL_ENV}" ]; then
        if [ ! -d ${env} ]; then
            echo "Creating and activating virtual environment ${env}"
            ${py} -m venv ${env}
            source ./${bin}
            echo "Upgrading pip"
            ${py} -m pip install --upgrade pip
        else
            echo "Virtual environment  ${env} already exists, activating..."
            source ./${bin}
        fi
    else
        echo "Already in a virtual environment!"

    fi
    if [ -z "${VIRTUAL_ENV}" ]; then
        echo "Could not start Virtual enviormant"
        else
        echo "Installing requirements.txt"
        pip install -r ./backend/requirements.txt
    fi
}



ve
