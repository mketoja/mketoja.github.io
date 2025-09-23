#!/usr/bin/env bash
source <(curl -fsSL https://raw.githubusercontent.com/community-scripts/ProxmoxVE/main/misc/build.func)
# Copyright (c) 2021-2025 community-scripts ORG
# Author: kristocopani
# License: MIT | https://github.com/community-scripts/ProxmoxVE/raw/main/LICENSE
# Source: https://github.com/glanceapp/glance

APP="Alpine-Glance"
var_tags="${var_tags:-alpine;dashboard}"
var_cpu="${var_cpu:-1}"
var_ram="${var_ram:-256}"
var_disk="${var_disk:-1}"
var_os="${var_os:-alpine}"
var_version="${var_version:-3.22}"
var_unprivileged="${var_unprivileged:-1}"

header_info "$APP"
variables
color
catch_errors

function update_script() {
  header_info
  check_container_storage
  check_container_resources

  if [[ ! -f /etc/init.d/alpine-glance ]]; then
    msg_error "No ${APP} Installation Found!"
    exit
  fi

  msg_info "Updating Alpine Packages"
  $STD apk -U upgrade
  msg_ok "Updated Alpine Packages"

  RELEASE=$(curl -fsSL https://github.com/glanceapp/glance/releases/latest | grep '"tag_name":' | cut -d '"' -fs4)
  if [ "${RELEASE}" != "$(cat /opt/alpine-glance_version.txt)" ] || [ ! -f /opt/${APP}_version.txt ]; then
    msg_info "Updating ${APP} LXC"

    curl -fsSL "https://github.com/glanceapp/glance/releases/download/${RELEASE}/glance-linux-amd64.tar.gz" -o glance.tar.gz
    $STD rc-service alpine-glance stop
    $STD tar -xvzf glance.tar.gz -C /opt/glance
    echo "${RELEASE}" >/opt/${APP}_version.txt
    rm -f glance.tar.gz
    $STD service alpine-glance start
    msg_ok "Updated Successfully"
  else
    msg_ok "No update required. ${APP} is already at ${RELEASE}"
  fi

  exit 0
}

start
build_container
description

msg_ok "Completed Successfully!\n"
echo -e "${CREATING}${GN}${APP} setup has been successfully initialized!${CL}"
echo -e "${INFO}${YW} Access it using the following URL:${CL}"
echo -e "${TAB}${GATEWAY}${BGN}http://${IP}:8080${CL}"
