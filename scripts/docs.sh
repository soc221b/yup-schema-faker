rm -rf docs
pwd=$PWD

cd site
yarn build

cd $pwd
mv site/dist docs
sed -i '' 's/assets/yup-schema-faker\/assets/' docs/index.html
