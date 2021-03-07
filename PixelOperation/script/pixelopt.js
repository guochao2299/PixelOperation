

function PixelOperationFunc()
{
    var cnv = document.getElementById("canvas");
    var cxt=cnv.getContext("2d");

    var cnvInverse = document.getElementById("inverse");
    var cxtInverse=cnvInverse.getContext("2d");

    var imageEffectIndex = document.getElementById("imageEffect").selectedIndex;
    var bwExpressIndex = document.getElementById("bwExpress").selectedIndex;
    var colorChannelIndex = document.getElementById("channelColor").selectedIndex;

    var imgData=cxt.getImageData(0,0,cnv.clientWidth,cnv.clientHeight);
    var data=imgData.data;    

    switch(imageEffectIndex)
    {
        case 0://inverse image
            for(var i=0;i<data.length;i+=4)
            {
                data[i+0]=255-data[i+0];
                data[i+1]=255-data[i+1];
                data[i+2]=255-data[i+2];
            }
            
            break;

        case 1:// black-white image
            var average=255;

            switch(bwExpressIndex)
            {
                case 0:                    
                    for(var i=0;i<data.length;i+=4)
                    { 
                        average=(data[i+0]+data[i+1]+data[i+2])/3;
                        data[i+0]=255-average;
                        data[i+1]=255-average;
                        data[i+2]=255-average;
                    } 
                    break;

                case 1:                    
                    for(var i=0;i<data.length;i+=4)
                    { 
                        average=data[i+0]*0.3+data[i+1]*0.6+data[i+2]*0.1;
                        data[i+0]=255-average;
                        data[i+1]=255-average;
                        data[i+2]=255-average;
                    } 
                    break;

                case 2:                    
                    for(var i=0;i<data.length;i+=4)
                    { 
                        average=Math.max(Math.max(data[i+0],data[i+1]),data[i+2]);
                        data[i+0]=255-average;
                        data[i+1]=255-average;
                        data[i+2]=255-average;
                    } 
                    break;
            }
            

            break;

        case 2://lightness image
            for(var i=0;i<data.length;i+=4)
            {
                var a=-50;
                data[i+0]+=a;
                data[i+1]+=a;
                data[i+2]+=a;
            } 

            break;
        case 3:// old
            for(var i=0;i<data.length;i+=4)
            {
                var r=data[i+0];
                var g=data[i+1];
                var b=data[i+2];
                data[i+0]=r*0.39+g*0.76+b*0.18;
                data[i+1]=r*0.35+g*0.68+b*0.16;
                data[i+2]=r*0.27+g*0.53+b*0.13;
            } 

            break;
            
        case 4:// red mask

            switch(colorChannelIndex)
            {
                case 0:
                    for(var i=0;i<data.length;i+=4)
                    {
                        var r=data[i+0];
                        var g=data[i+1];
                        var b=data[i+2];
                        var average=(r+g+b)/3;
                        data[i+0]=average;
                        data[i+1]=0;
                        data[i+2]=0;
                    }  
                    break;

                case 1:
                    for(var i=0;i<data.length;i+=4)
                    {
                        var r=data[i+0];
                        var g=data[i+1];
                        var b=data[i+2];
                        var average=(r+g+b)/3;
                        data[i+0]=0;
                        data[i+1]=average;
                        data[i+2]=0;
                    }  
                    break;

                case 2:
                    for(var i=0;i<data.length;i+=4)
                    {
                        var r=data[i+0];
                        var g=data[i+1];
                        var b=data[i+2];
                        var average=(r+g+b)/3;
                        data[i+0]=0;
                        data[i+1]=0;
                        data[i+2]=average;
                    }  
                    break;
            }            

            break;

        case 5:// touming
            for(var i=0;i<data.length;i+=4)
            {                    
                data[i+3]=data[i+3]*0.3;
            } 

            break;

        case 6://fudiao
            for(var i=0;i<data.length-4;i+=4)
            {
                var r1=data[i+0];
                var g1=data[i+1];
                var b1=data[i+2];
                var r2=data[i+4];
                var g2=data[i+5];
                var b2=data[i+6];
                                            
                var r = Math.abs(g1 - g2 + 128);                             
                var g = Math.abs(g1 - g2 + 128);                             
                var b = Math.abs(b1 - b2 + 128);                             
                if (r > 255)                                 
                    r = 255;                             
                if (r < 0)                                 
                    r = 0;                             
                if (g > 255)                                 
                    g = 255;                             
                if (g < 0)                                 
                    g = 0;                             
                if (b > 255)                                 
                    b = 255;                             
                if (b < 0)                                 
                    b = 0;    
                    
                data[i+0]=r;
                data[i+1]=g;
                data[i+2]=b;
            } 

            break;             
    }  
    
    cxtInverse.putImageData(imgData,0,0);
}
