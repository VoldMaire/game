readonly result_folder_name=res_90x90;
rm -rf $result_folder_name
mkdir $result_folder_name
for filename in /home/voldmaire/projects/game/images/*.png; do

        convert $filename -resize 90x90 $result_folder_name/$(basename $filename) ;
    done