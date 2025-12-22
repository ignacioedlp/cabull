import { Card, CardHeader, CardContent, CardTitle } from '../ui/card'
import { Button } from '../ui/button'


function TopBarbers() {
  return (
    <Card className="border border-muted">
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Top Barberos</CardTitle>
        <Button variant="link" className="text-primary text-sm font-bold hover:underline">Ver Todo</Button>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center gap-4 p-3 hover:bg-muted rounded-lg transition-colors cursor-pointer">
          <div className="bg-center bg-no-repeat bg-cover rounded-full size-12 shadow-sm" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDFUAKxdCimcLnyAmqoSV6P_BLMr650699zzCovKDAw_eO8h-ClZqnQS4mf4yYJS-QC5-2dSvwYvLzLxZZ786C-R0oLyOoZlv-ly_zpWO5uzMf-33NA35ODTNlHjedAElexDaWj8k5HjPivZeyfxlNgbsjTkf2_Rr9Njt0IvXkjnh-QfwV51MX9TlZqwjw2g8Okz8wxZQxxeCPR-2qlKoTzdu9V1swAhb3PdxJB4jJ1IMSOPiPSNNKsFS8zaYiJxy4-3DgjWhR4ZUan")' }}></div>
          <div className="flex-1">
            <h4 className="font-bold text-foreground text-sm">Martin Gomez</h4>
            <p className="text-muted-foreground text-xs">Barbero Senior</p>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-bold text-foreground text-sm">$1,240</span>
            <span className="text-green-500 text-xs font-bold">+12%</span>
          </div>
        </div>
        <div className="flex items-center gap-4 p-3 hover:bg-muted rounded-lg transition-colors cursor-pointer">
          <div className="bg-center bg-no-repeat bg-cover rounded-full size-12 shadow-sm" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAlqIu_1GXzb2YMNd-ow-2075erhywjNdfr5mrqFvZF4X3k-TRHUrsTzLeCsJO_HRca7BFBiveyMKjYHB0S03jcMI-yLtPWrOz7-tmEs-oXc38KVMp8VDmYgliyPg8GaKrRWqqILYDNo66AhVaA1U8Lyjs3XQh_NruMdPqsCM6wu3J2WNSdGRbm_s9aSonHZVFHIWPcPQWgyMH2oSqoaxKF6UlXQj_UfdQA-0us3jcbl-Su_dIxt7VEgevhlmcD-aBSff3P_6o0apCI")' }}></div>
          <div className="flex-1">
            <h4 className="font-bold text-foreground text-sm">Juliana Moreno</h4>
            <p className="text-muted-foreground text-xs">Especialista en Color</p>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-bold text-foreground text-sm">$980</span>
            <span className="text-green-500 text-xs font-bold">+5%</span>
          </div>
        </div>
        <div className="flex items-center gap-4 p-3 hover:bg-muted rounded-lg transition-colors cursor-pointer">
          <div className="bg-muted text-muted-foreground font-bold text-sm rounded-full size-12 flex items-center justify-center">
            SD
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-foreground text-sm">Sam Davis</h4>
            <p className="text-muted-foreground text-xs">Barbero Junior</p>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-bold text-foreground text-sm">$650</span>
            <span className="text-destructive text-xs font-bold">-2%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default TopBarbers