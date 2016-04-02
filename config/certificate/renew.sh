#!/bin/bash

/usr/local/bin/acme.py --account-key /root/.acme_account.key --csr /develop/alphatr-stat/config/certificate/stat.alphadn.com.csr --acme-dir /develop/alphatr-stat/config/challenge/ > /var/tmp/stat.alphadn.com.crt || exit
wget -O - https://letsencrypt.org/certs/lets-encrypt-x1-cross-signed.pem > /var/tmp/intermediate.pem
cat /var/tmp/stat.alphadn.com.crt /var/tmp/intermediate.pem > /develop/alphatr-stat/config/certificate/stat.alphadn.com.pem
service nginx reload
