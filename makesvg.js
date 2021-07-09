var dir = ".."

load(dir+"/kage-engine/2d.js");
load(dir+"/kage-engine/buhin.js");
load(dir+"/kage-engine/curve.js");
load(dir+"/kage-engine/kage.js");
load(dir+"/kage-engine/kagecd.js");
load(dir+"/kage-engine/kagedf.js");
load(dir+"/kage-engine/polygon.js");
load(dir+"/kage-engine/polygons.js");

if(arguments.length != 1){
  print("ERROR: input the target name");
  quit();
}
target = arguments[0];

dirname = "./"+target+".work";
dir = new java.io.File(dirname);
if(!dir.exists()){
  dir.mkdir();
}

fis = new java.io.FileInputStream("./" + target + ".source");
isr = new java.io.InputStreamReader(fis);
br = new java.io.BufferedReader(isr);

while((line = br.readLine()) != null){
  tab = line.indexOf("\t");
  code = line.substring(0, tab);
  data = line.substring(tab + 1, line.length());
  if(data.length() > 0){
    var kage = new Kage();
    //kage.kUseCurve = true;
    kage.kUseCurve = false;
    var polygons = new Polygons();

    kage.kBuhin.push("temp", data + "");
    kage.makeGlyph(polygons, "temp");

    fos = new java.io.FileOutputStream(dirname + "/" + code + ".svg");
    osw = new java.io.OutputStreamWriter(fos);
    bw = new java.io.BufferedWriter(osw);

    bw.write(polygons.generateSVG(false));
    //bw.write(polygons.generateSVGFont(false));

    bw.close();
    osw.close();
    fos.close();
  }
}
br.close();
isr.close();
fis.close();
