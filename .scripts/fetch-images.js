const fs = require("fs");
const request = require("request");

const teslaColors = ["ppsw", "pbsb", "pmng", "ppsb", "ppmr"];
const teslaWheels = [
  "w32d",
  "w38b",
  "w39b",
  "wt20",
  "wtas",
  "wtd2",
  "wtsd",
  "wttc",
  "wtut",
  "wy19",
  "wy20",
];
const teslaColorsToName = {
  ppsw: "white",
  pbsb: "black",
  pmng: "grey",
  ppsb: "blue",
  ppmr: "red",
};

function download(uri, filename) {
  return new Promise((resolve, reject) => {
    request.head(uri, (err, res, body) => {
      if (err) {
        console.log("🔴 : download -> err", err);
        reject(err);
        return;
      }
      console.log(filename);
      request(uri).pipe(fs.createWriteStream(filename)).on("close", resolve);
    });
  });
}

// TODO: rely on a JSON (the JSON that will be provided for the challenge)?
for (const teslaColor of teslaColors) {
  const colorName = teslaColorsToName[teslaColor];
  download(
    `https://static-assets.tesla.com/share/tesla_design_studio_assets/MODEL3/UI/ui_swat_col_${teslaColor}.png`,
    `../assets/img/color-${colorName}.png`
  );
  for (const teslaWheel of teslaWheels) {
    download(
      `https://static-assets.tesla.com/configurator/compositor?&options=$${teslaWheel.toUpperCase()},$${teslaColor.toUpperCase()},$DV2W,$MT308,$IN3BW&view=STUD_3QTR&model=m3&size=1441&bkba_opt=1`,
      `../assets/img/models-${colorName}-${teslaWheel}.png`
    );
  }
}

/*

Colors: ["$PPSW", "$PBSB", "$PMNG", "$PPSB", "$PPMR"]

# Model 3
## Wheel (1)
https://static-assets.tesla.com/configurator/compositor?&options=$W38B,$PPSW,$DV2W,$MT308,$IN3BW&view=STUD_3QTR&model=m3&size=1441&bkba_opt=1
https://static-assets.tesla.com/configurator/compositor?&options=$W39B,$PPSW,$DV2W,$MT308,$IN3BW&view=STUD_3QTR&model=m3&size=1441&bkba_opt=1

## Color (2)
https://static-assets.tesla.com/configurator/compositor?&options=$W38B,$PPSW,$DV2W,$MT310,$IN3PW&view=STUD_3QTR&model=m3&size=1441&bkba_opt=1
https://static-assets.tesla.com/configurator/compositor?&options=$W38B,$PBSB,$DV2W,$MT310,$IN3PW&view=STUD_3QTR&model=m3&size=1441&bkba_opt=1
https://static-assets.tesla.com/configurator/compositor?&options=$W38B,$PMNG,$DV2W,$MT310,$IN3PW&view=STUD_3QTR&model=m3&size=1441&bkba_opt=1
https://static-assets.tesla.com/configurator/compositor?&options=$W38B,$PPSB,$DV2W,$MT310,$IN3PW&view=STUD_3QTR&model=m3&size=1441&bkba_opt=1
https://static-assets.tesla.com/configurator/compositor?&options=$W38B,$PPMR,$DV2W,$MT310,$IN3PW&view=STUD_3QTR&model=m3&size=1441&bkba_opt=1

## Type??
https://static-assets.tesla.com/configurator/compositor?&options=$W38B,$PPSW,$DV2W,$MT308,$IN3BW&view=STUD_3QTR&model=m3&size=1441&bkba_opt=1
https://static-assets.tesla.com/configurator/compositor?&options=$W38B,$PPSW,$DV4W,$MT310,$IN3PW&view=STUD_3QTR&model=m3&size=1441&bkba_opt=1
https://static-assets.tesla.com/configurator/compositor?&options=$W32D,$PPSW,$DV4W,$SLR1,$MT311,$IN3PW&view=STUD_3QTR&model=m3&size=1441&bkba_opt=1



# Model S
## Wheels
https://static-assets.tesla.com/configurator/compositor?&options=$WTAS,$PPSW,$MTS03&view=STUD_3QTR_V2&model=ms&size=1441&bkba_opt=1
https://static-assets.tesla.com/configurator/compositor?&options=$WTD2,$PPSW,$MTS03&view=STUD_3QTR_V2&model=ms&size=1441&bkba_opt=1
https://static-assets.tesla.com/configurator/compositor?&options=$WTTC,$PPSW,$MTS03&view=STUD_3QTR_V2&model=ms&size=1441&bkba_opt=1

# Model X
https://static-assets.tesla.com/configurator/compositor?&options=$WT20,$PPSW,$MTX03&view=STUD_3QTR_V2&model=mx&size=1441&bkba_opt=1
https://static-assets.tesla.com/configurator/compositor?&options=$WTSD,$PPSW,$MTX03&view=STUD_3QTR_V2&model=mx&size=1441&bkba_opt=1
https://static-assets.tesla.com/configurator/compositor?&options=$WTUT,$PPSW,$MTX03&view=STUD_3QTR_V2&model=mx&size=1441&bkba_opt=1

# Model Y
https://static-assets.tesla.com/configurator/compositor?&options=$WY19B,$PPSW,$DV4W,$MTY03,$INYPB&view=STUD_3QTR&model=my&size=1441&bkba_opt=1
https://static-assets.tesla.com/configurator/compositor?&options=$WY20P,$PPSW,$DV4W,$MTY03,$INYPB&view=STUD_3QTR&model=my&size=1441&bkba_opt=1

# Wheels
https://static-assets.tesla.com/share/tesla_design_studio_assets/MODELS/UI/ui_swat_whl_wtas.png
https://static-assets.tesla.com/share/tesla_design_studio_assets/MODELS/UI/ui_swat_whl_wtds.png
https://static-assets.tesla.com/share/tesla_design_studio_assets/MODELS/UI/ui_swat_whl_wttc.png
https://static-assets.tesla.com/share/tesla_design_studio_assets/MODEL3/UI/opt-wheels-18pinwheel.png
https://static-assets.tesla.com/share/tesla_design_studio_assets/MODEL3/UI/opt-wheels-19stilette.png
https://static-assets.tesla.com/share/tesla_design_studio_assets/MODELX/UI/ui_swat_whl_wt20.png
https://static-assets.tesla.com/share/tesla_design_studio_assets/MODELX/UI/ui_swat_whl_wtsd.png
https://static-assets.tesla.com/share/tesla_design_studio_assets/MODELX/UI/ui_swat_whl_wtut.png
https://static-assets.tesla.com/share/tesla_design_studio_assets/MODELY/UI/gemini_wheels.png
https://static-assets.tesla.com/share/tesla_design_studio_assets/MODELY/UI/induction_wheels.png

# Colors
https://static-assets.tesla.com/share/tesla_design_studio_assets/MODEL3/UI/ui_swat_col_ppsw.png
https://static-assets.tesla.com/share/tesla_design_studio_assets/MODEL3/UI/ui_swat_col_pbsb.png
https://static-assets.tesla.com/share/tesla_design_studio_assets/MODEL3/UI/ui_swat_col_pmng.png
https://static-assets.tesla.com/share/tesla_design_studio_assets/MODEL3/UI/ui_swat_col_ppsb.png
https://static-assets.tesla.com/share/tesla_design_studio_assets/MODEL3/UI/ui_swat_col_ppmr.png

*/
