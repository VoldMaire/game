readonly result_folder_name=res_90x90;
rm -rf $result_folder_name
mkdir $result_folder_name
mkdir $result_folder_name/basic
cp *.tps $result_folder_name

for filename in /home/voldmaire/projects/game/images/basic/*.png; do

        convert $filename -resize 90x90 $result_folder_name/basic/$(basename $filename) ;
    done

cd $result_folder_name
for i in *.tps; do TexturePacker $i; done
rm -f *.tps
rm -rf basic
cd ..