#!/usr/bin/env bash

# Copyright (c) 2021-2025 community-scripts ORG
# Author: kristocopani
# License: MIT | https://github.com/community-scripts/ProxmoxVE/raw/main/LICENSE
# Source: https://github.com/glanceapp/glance

source /dev/stdin <<<"$FUNCTIONS_FILE_PATH"

color
verb_ip6
catch_errors
setting_up_container
network_check
update_os

msg_info "Installing Dependencies"
$STD apk add curl nano
msg_ok "Installed Dependencies"

-mkdir -p /opt/glance

RELEASE=$(curl -fsSL https://github.com/glanceapp/glance/releases/latest | grep '"tag_name":' | cut -d '"' -fs4)
curl -fsSL "https://github.com/glanceapp/glance/releases/download/${RELEASE}/glance-linux-amd64.tar.gz" -o glance.tar.gz

$STD tar -xvzf glance.tar.gz -C /opt/glance 
chmod +x /opt/glance/glance

echo "${RELEASE}" >/opt/alpine-glance_version.txt
msg_ok "Installed Alpine Glance"

msg_info "Configuring Glance"
cat <<EOF >/opt/glance/glance.yml
pages:
  - name: Startpage
    width: slim
    hide-desktop-navigation: true
    center-vertically: true
    columns:
      - size: full
        widgets:
          - type: search
            autofocus: true
          - type: bookmarks
            groups:
              - title: General
                links:
                  - title: Google
                    url: https://www.google.com/
                  - title: Helper Scripts
                    url: https://github.com/community-scripts/ProxmoxVE
EOF
msg_ok "Configured Glance"

msg_info "Creating Glance Service"

cat <<EOF >/etc/init.d/alpine-glance
#!/sbin/openrc-run
name="AlpineGlance"
description="Alpine Glance Service"
command="/opt/glance/glance --config /opt/glance/glance.yml"
command_background="yes"
pidfile="/run/alpine-glance.pid"
EOF

$STD chmod + /etc/init.d/alpine-glance
msg_ok "Created Glance Service"

$STD rc-service alpine-glance start
$STD rc-update add alpine-glance default
msg_ok "Installed Alpine Glance"

motd_ssh
customize
